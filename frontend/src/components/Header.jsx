import { formatDateTime } from "../services/api";


function Header({
  pages,
  activePage,
  onNavigate,
  onRefresh,
  apiAvailable,
  databaseReady,
  apiDocsUrl,
  lastUpdatedAt,
  isBusy,
}) {
  return (
    <header className="shell-header">
      <div className="shell-header__top">
        <div className="brand-block">
          <p className="brand-kicker">Data Quality Command Center</p>
          <h1>Auditoria visual para pipelines e qualidade de dados</h1>
          <p className="brand-copy">
            Um cockpit enxuto para demonstrar estado da API, integridade do banco
            e eventos técnicos em linguagem de portfólio.
          </p>
        </div>

        <div className="header-actions">
          <a
            className="ghost-button"
            href={apiDocsUrl}
            target="_blank"
            rel="noreferrer"
          >
            API Docs
          </a>
          <button className="primary-button" onClick={onRefresh} type="button">
            {isBusy ? "Atualizando..." : "Atualizar dados"}
          </button>
        </div>
      </div>

      <div className="status-strip">
        <span className={`status-chip ${apiAvailable ? "success" : "danger"}`}>
          API {apiAvailable ? "online" : "offline"}
        </span>
        <span className={`status-chip ${databaseReady ? "success" : "warning"}`}>
          Banco {databaseReady ? "ready" : "pendente"}
        </span>
        <span className="status-chip neutral">
          Última leitura {formatDateTime(lastUpdatedAt)}
        </span>
      </div>

      <nav className="nav-pills" aria-label="Navegação principal do frontend">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`nav-pill ${activePage === page.id ? "active" : ""}`}
            onClick={() => onNavigate(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  );
}


export default Header;
