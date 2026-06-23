import DataTable from "../components/DataTable";
import { formatDateTime, formatLabel, toTone } from "../services/api";


function QualityChecks({ dashboard }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "pipeline_run_id", label: "Run ID" },
    { key: "check_name", label: "Check" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className={`data-badge ${toTone(row.status)}`}>
          {formatLabel(row.status)}
        </span>
      ),
    },
    {
      key: "severity",
      label: "Severidade",
      render: (row) => (
        <span className={`data-badge ${toTone(row.severity)}`}>
          {formatLabel(row.severity)}
        </span>
      ),
    },
    { key: "expected_value", label: "Esperado" },
    { key: "actual_value", label: "Atual" },
    {
      key: "created_at",
      label: "Criado em",
      render: (row) => formatDateTime(row.created_at),
    },
  ];

  return (
    <DataTable
      title="Quality Checks"
      description="Checks de qualidade com foco em status, severidade e comparação entre esperado e encontrado."
      columns={columns}
      rows={dashboard.qualityChecks}
      emptyTitle="Nenhuma validação disponível"
      emptyDescription="Use o endpoint de quality checks ou a seed para transformar esta tela em evidência visual."
    />
  );
}


export default QualityChecks;
