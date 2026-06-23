function MetricCard({ label, value, tone, description, hint }) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-card__glow" />
      <p className="metric-card__label">{label}</p>
      <strong className="metric-card__value">{value}</strong>
      <p className="metric-card__description">{description}</p>
      <span className="metric-card__hint">{hint}</span>
    </article>
  );
}


export default MetricCard;
