function DataTable({
  title,
  description,
  columns,
  rows,
  emptyTitle,
  emptyDescription,
}) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Dados operacionais</p>
          <h2>{title}</h2>
        </div>
        <p className="section-description">{description}</p>
      </div>

      <article className="panel table-panel">
        {rows.length === 0 ? (
          <div className="empty-state">
            <h3>{emptyTitle}</h3>
            <p>{emptyDescription}</p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id || `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render
                          ? column.render(row)
                          : row[column.key] ?? "--"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}


export default DataTable;
