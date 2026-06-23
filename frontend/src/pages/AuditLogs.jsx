import DataTable from "../components/DataTable";
import { formatDateTime, formatLabel } from "../services/api";


function AuditLogs({ dashboard }) {
  const columns = [
    { key: "id", label: "ID" },
    {
      key: "event_type",
      label: "Evento",
      render: (row) => (
        <span className="log-event">
          <span className="log-pulse" />
          {formatLabel(row.event_type)}
        </span>
      ),
    },
    { key: "message", label: "Mensagem" },
    {
      key: "created_at",
      label: "Criado em",
      render: (row) => formatDateTime(row.created_at),
    },
  ];

  return (
    <DataTable
      title="Audit Logs"
      description="Eventos técnicos gerados pela API para suportar rastreabilidade e storytelling de troubleshooting."
      columns={columns}
      rows={dashboard.auditLogs}
      emptyTitle="Nenhum log técnico recebido"
      emptyDescription="Ao registrar pipelines e checks, a API alimenta esta grade automaticamente."
    />
  );
}


export default AuditLogs;
