import { formatDateTime } from "../services/api";


function HealthStatus({ dashboard }) {
  const cards = [dashboard.health, dashboard.readiness];

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Saúde da aplicação</p>
          <h2>API e banco em um só quadro</h2>
        </div>
      </div>

      <div className="health-grid">
        {cards.map((card) => (
          <article key={card.endpoint} className={`panel health-card ${card.state}`}>
            <div className="health-card__header">
              <span className="health-card__endpoint">{card.endpoint}</span>
              <span className={`data-badge ${card.state === "offline" ? "danger" : card.state}`}>
                {card.state === "online"
                  ? "Online"
                  : card.state === "warning"
                    ? "Atenção"
                    : "Offline"}
              </span>
            </div>
            <h3>{card.label}</h3>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>

      <article className="panel endpoint-panel">
        <p className="section-kicker">URLs locais</p>
        <h2>Referências rápidas para desenvolvimento</h2>

        <div className="endpoint-list">
          <div>
            <span>API Docs</span>
            <strong>{dashboard.apiDocsUrl}</strong>
          </div>
          <div>
            <span>Frontend</span>
            <strong>http://localhost:3000</strong>
          </div>
          <div>
            <span>Última leitura</span>
            <strong>{formatDateTime(dashboard.lastUpdatedAt)}</strong>
          </div>
        </div>
      </article>
    </section>
  );
}


export default HealthStatus;
