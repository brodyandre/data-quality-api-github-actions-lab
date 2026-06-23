import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import AuditLogs from "./pages/AuditLogs";
import HealthStatus from "./pages/HealthStatus";
import Overview from "./pages/Overview";
import PipelineRuns from "./pages/PipelineRuns";
import QualityChecks from "./pages/QualityChecks";
import { createEmptyDashboard, loadDashboardData } from "./services/api";


const PAGES = [
  { id: "overview", label: "Overview" },
  { id: "pipeline-runs", label: "Pipeline Runs" },
  { id: "quality-checks", label: "Quality Checks" },
  { id: "audit-logs", label: "Audit Logs" },
  { id: "health-status", label: "Health Status" },
];


function App() {
  const [activePage, setActivePage] = useState("overview");
  const [dashboard, setDashboard] = useState(createEmptyDashboard());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const nextDashboard = await loadDashboardData();
      if (!mounted) {
        return;
      }
      setDashboard(nextDashboard);
      setIsInitialLoad(false);
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  async function refreshData() {
    setIsRefreshing(true);
    const nextDashboard = await loadDashboardData();
    setDashboard(nextDashboard);
    setIsRefreshing(false);
  }

  const pageProps = useMemo(
    () => ({
      dashboard,
      isBusy: isInitialLoad || isRefreshing,
    }),
    [dashboard, isInitialLoad, isRefreshing]
  );

  const currentPage = useMemo(() => {
    switch (activePage) {
      case "pipeline-runs":
        return <PipelineRuns {...pageProps} />;
      case "quality-checks":
        return <QualityChecks {...pageProps} />;
      case "audit-logs":
        return <AuditLogs {...pageProps} />;
      case "health-status":
        return <HealthStatus {...pageProps} />;
      case "overview":
      default:
        return <Overview {...pageProps} />;
    }
  }, [activePage, pageProps]);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-backdrop" />

      <Header
        pages={PAGES}
        activePage={activePage}
        onNavigate={setActivePage}
        onRefresh={refreshData}
        apiAvailable={dashboard.apiAvailable}
        databaseReady={dashboard.databaseReady}
        apiDocsUrl={dashboard.apiDocsUrl}
        lastUpdatedAt={dashboard.lastUpdatedAt}
        isBusy={isInitialLoad || isRefreshing}
      />

      <main className="dashboard-main">
        {dashboard.notice ? (
          <section className={`system-banner ${dashboard.notice.tone}`}>
            <div>
              <p className="system-banner__label">{dashboard.notice.label}</p>
              <h2>{dashboard.notice.title}</h2>
              <p>{dashboard.notice.message}</p>
            </div>
          </section>
        ) : null}

        {dashboard.issues.length > 0 ? (
          <section className="panel issues-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Observabilidade</p>
                <h2>Últimas ocorrências da coleta</h2>
              </div>
            </div>
            <ul className="issues-list">
              {dashboard.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {currentPage}
      </main>
    </div>
  );
}


export default App;
