const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");
export const API_DOCS_URL = `${API_BASE_URL}/docs`;


const defaultSummary = {
  total_pipeline_runs: null,
  successful_pipeline_runs: null,
  failed_pipeline_runs: null,
  total_quality_checks: null,
  passed_quality_checks: null,
  failed_quality_checks: null,
  high_severity_checks: null,
  total_audit_logs: null,
};


export function createEmptyDashboard() {
  return {
    apiBaseUrl: API_BASE_URL,
    apiDocsUrl: API_DOCS_URL,
    apiAvailable: false,
    databaseReady: false,
    health: {
      endpoint: "/health",
      label: "API",
      state: "offline",
      detail: "Aguardando primeira leitura.",
    },
    readiness: {
      endpoint: "/ready",
      label: "Banco",
      state: "offline",
      detail: "Aguardando primeira leitura.",
    },
    pipelineRuns: [],
    qualityChecks: [],
    auditLogs: [],
    summary: { ...defaultSummary },
    issues: [],
    notice: {
      tone: "warning",
      label: "Modo de preparação",
      title: "Painel aguardando a API",
      message:
        "Assim que o backend responder, este dashboard exibirá auditoria, qualidade e saúde da aplicação em tempo real.",
    },
    lastUpdatedAt: null,
  };
}


export async function loadDashboardData() {
  const requests = {
    health: fetchJson("/health"),
    readiness: fetchJson("/ready"),
    pipelineRuns: fetchJson("/pipeline-runs"),
    qualityChecks: fetchJson("/quality-checks"),
    auditLogs: fetchJson("/audit-logs"),
    summary: fetchJson("/quality-summary"),
  };

  const entries = Object.entries(requests);
  const settledResults = await Promise.allSettled(entries.map((entry) => entry[1]));
  const results = Object.fromEntries(
    entries.map(([key], index) => [key, settledResults[index]])
  );

  const apiAvailable = results.health.status === "fulfilled";
  const databaseReady =
    results.readiness.status === "fulfilled" &&
    results.readiness.value?.status === "ready";

  const pipelineRuns =
    results.pipelineRuns.status === "fulfilled" ? results.pipelineRuns.value : [];
  const qualityChecks =
    results.qualityChecks.status === "fulfilled" ? results.qualityChecks.value : [];
  const auditLogs =
    results.auditLogs.status === "fulfilled" ? results.auditLogs.value : [];

  const summary = resolveSummary(results, pipelineRuns, qualityChecks, auditLogs);
  const issues = collectIssues(results);

  return {
    apiBaseUrl: API_BASE_URL,
    apiDocsUrl: API_DOCS_URL,
    apiAvailable,
    databaseReady,
    health: buildEndpointStatus(
      results.health,
      "/health",
      "API",
      "API acessível e pronta para responder."
    ),
    readiness: buildEndpointStatus(
      results.readiness,
      "/ready",
      "Banco",
      "Banco conectado e tabelas disponíveis."
    ),
    pipelineRuns,
    qualityChecks,
    auditLogs,
    summary,
    issues,
    notice: buildNotice(apiAvailable, databaseReady),
    lastUpdatedAt: new Date().toISOString(),
  };
}


async function fetchJson(path) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, path));
    }

    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Tempo limite excedido ao consultar ${path}.`);
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}


async function readErrorMessage(response, path) {
  const text = await response.text();

  if (!text) {
    return `Falha ao consultar ${path}: HTTP ${response.status}.`;
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed.detail) {
      return `Falha ao consultar ${path}: ${parsed.detail}`;
    }
  } catch {
    // Ignora parse inválido e usa o texto original.
  }

  return `Falha ao consultar ${path}: ${text}`;
}


function buildEndpointStatus(result, endpoint, label, successDetail) {
  if (result.status === "fulfilled") {
    return {
      endpoint,
      label,
      state: "online",
      detail: successDetail,
    };
  }

  const message = result.reason?.message || "Endpoint indisponível.";

  return {
    endpoint,
    label,
    state: message.includes("Tabelas ausentes") ? "warning" : "offline",
    detail: message,
  };
}


function resolveSummary(results, pipelineRuns, qualityChecks, auditLogs) {
  if (results.summary.status === "fulfilled") {
    return results.summary.value;
  }

  const hasSomeSuccessfulSource = [
    results.pipelineRuns,
    results.qualityChecks,
    results.auditLogs,
  ].some((result) => result.status === "fulfilled");

  if (!hasSomeSuccessfulSource) {
    return { ...defaultSummary };
  }

  const successfulPipelineRuns = pipelineRuns.filter((item) =>
    normalizeLabel(item.status).includes("success")
  ).length;
  const failedPipelineRuns = pipelineRuns.filter((item) =>
    normalizeLabel(item.status).includes("failed")
  ).length;
  const passedQualityChecks = qualityChecks.filter((item) =>
    normalizeLabel(item.status).includes("passed")
  ).length;
  const failedQualityChecks = qualityChecks.filter((item) =>
    normalizeLabel(item.status).includes("failed")
  ).length;
  const highSeverityChecks = qualityChecks.filter((item) =>
    normalizeLabel(item.severity).includes("high")
  ).length;

  return {
    total_pipeline_runs: pipelineRuns.length,
    successful_pipeline_runs: successfulPipelineRuns,
    failed_pipeline_runs: failedPipelineRuns,
    total_quality_checks: qualityChecks.length,
    passed_quality_checks: passedQualityChecks,
    failed_quality_checks: failedQualityChecks,
    high_severity_checks: highSeverityChecks,
    total_audit_logs: auditLogs.length,
  };
}


function collectIssues(results) {
  return Object.entries(results)
    .filter(([, result]) => result.status === "rejected")
    .map(([key, result]) => `${humanizeKey(key)}: ${result.reason?.message || "indisponível"}`);
}


function buildNotice(apiAvailable, databaseReady) {
  if (apiAvailable && databaseReady) {
    return {
      tone: "success",
      label: "Modo operacional",
      title: "API e banco sincronizados",
      message:
        "Os dados exibidos abaixo vieram diretamente do FastAPI e estão prontos para gerar prints do portfólio.",
    };
  }

  if (apiAvailable) {
    return {
      tone: "warning",
      label: "Modo degradado",
      title: "API online, mas banco ainda não está pronto",
      message:
        "Confira a tela Health Status e rode as migrações se as tabelas ainda não existirem.",
    };
  }

  return {
    tone: "warning",
    label: "Modo offline",
    title: "A interface está pronta, mas a API não respondeu",
    message:
      "Suba o backend FastAPI para ver dados reais. Enquanto isso, a UI permanece navegável para revisão visual.",
  };
}


function humanizeKey(value) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (character) => character.toUpperCase());
}


function normalizeLabel(value) {
  return String(value || "").trim().toLowerCase();
}


export function formatDateTime(value) {
  if (!value) {
    return "--";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsedDate);
}


export function formatNumber(value) {
  if (value === null || value === undefined) {
    return "--";
  }

  return new Intl.NumberFormat("pt-BR").format(value);
}


export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "--";
  }

  return `${value.toFixed(1)}%`;
}


export function calculateSuccessRate(summary) {
  if (summary.total_pipeline_runs === null || summary.total_pipeline_runs === undefined) {
    return null;
  }

  if (summary.total_pipeline_runs === 0) {
    return 0;
  }

  return (
    (summary.successful_pipeline_runs / summary.total_pipeline_runs) *
    100
  );
}


export function toTone(value) {
  const normalizedValue = normalizeLabel(value);

  if (
    normalizedValue.includes("success") ||
    normalizedValue.includes("passed") ||
    normalizedValue.includes("ready") ||
    normalizedValue.includes("online") ||
    normalizedValue.includes("ok")
  ) {
    return "success";
  }

  if (
    normalizedValue.includes("failed") ||
    normalizedValue.includes("error") ||
    normalizedValue.includes("offline")
  ) {
    return "danger";
  }

  if (
    normalizedValue.includes("warning") ||
    normalizedValue.includes("high") ||
    normalizedValue.includes("degraded")
  ) {
    return "warning";
  }

  return "neutral";
}


export function formatLabel(value) {
  if (!value) {
    return "--";
  }

  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
