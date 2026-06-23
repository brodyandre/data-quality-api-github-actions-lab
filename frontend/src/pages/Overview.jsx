import MetricCard from "../components/MetricCard";
import {
  API_BASE_URL,
  calculateSuccessRate,
  formatNumber,
  formatPercent,
} from "../services/api";


function Overview({ dashboard, isBusy }) {
  const { summary, apiAvailable, databaseReady } = dashboard;
  const successRate = calculateSuccessRate(summary);

  const metrics = [
    {
      label: "Total de pipelines",
      value: formatNumber(summary.total_pipeline_runs),
      tone: "neutral",
      description: "Execuções registradas na tabela pipeline_runs.",
      hint: apiAvailable ? "Dados reais carregados da API." : "Aguardando backend.",
    },
    {
      label: "Sucessos",
      value: formatNumber(summary.successful_pipeline_runs),
      tone: "success",
      description: "Pipelines finalizados com status de sucesso.",
      hint: "Bom indicador para capturas de estabilidade.",
    },
    {
      label: "Falhas",
      value: formatNumber(summary.failed_pipeline_runs),
      tone: "danger",
      description: "Execuções com erro ou término malsucedido.",
      hint: "Útil para demonstrar troubleshooting e correção.",
    },
    {
      label: "Alertas",
      value: formatNumber(summary.high_severity_checks),
      tone: "warning",
      description: "Checks de severidade alta encontrados.",
      hint: "Sinal de atenção para qualidade de dados.",
    },
    {
      label: "Taxa de sucesso",
      value: formatPercent(successRate),
      tone: successRate !== null && successRate >= 90 ? "success" : "warning",
      description: "Percentual de execuções bem-sucedidas.",
      hint: "Calculado a partir do resumo do backend.",
    },
  ];

  return (
    <section className="page-section">
      <div className="overview-grid">
        <article className="panel overview-hero">
          <p className="section-kicker">Interface gráfica</p>
          <h2>Data Quality Command Center</h2>
          <p className="overview-copy">
            Um painel visual para demonstrar auditoria técnica, monitoramento de
            pipelines e qualidade de dados com linguagem de portfólio.
          </p>

          <div className="signal-grid">
            <div className={`signal-tile ${apiAvailable ? "success" : "danger"}`}>
              <span>API</span>
              <strong>{apiAvailable ? "ONLINE" : "OFFLINE"}</strong>
            </div>
            <div className={`signal-tile ${databaseReady ? "success" : "warning"}`}>
              <span>Banco</span>
              <strong>{databaseReady ? "READY" : "PENDENTE"}</strong>
            </div>
          </div>

          <div className="overview-meta">
            <div>
              <span>Endpoint base</span>
              <strong>{API_BASE_URL}</strong>
            </div>
            <div>
              <span>Modo atual</span>
              <strong>{isBusy ? "Sincronizando..." : apiAvailable ? "Tempo real" : "Fallback amigável"}</strong>
            </div>
          </div>
        </article>

        <article className="panel spotlight-panel">
          <p className="section-kicker">Narrativa para prints</p>
          <h2>Telas prontas para README</h2>
          <p>
            Overview, Quality Checks e Health Status foram desenhadas para
            funcionarem bem como evidência visual em documentação e portfólio.
          </p>
          <ul className="spotlight-list">
            <li>Cards com números legíveis e tons semânticos claros</li>
            <li>Tabelas com fallback elegante quando a API estiver offline</li>
            <li>Status explícito de API e banco para troubleshooting visual</li>
          </ul>
        </article>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  );
}


export default Overview;
