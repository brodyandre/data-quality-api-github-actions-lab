import DataTable from "../components/DataTable";
import { formatDateTime, formatLabel, formatNumber, toTone } from "../services/api";


function PipelineRuns({ dashboard }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "pipeline_name", label: "Pipeline" },
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
      key: "records_processed",
      label: "Registros",
      render: (row) => formatNumber(row.records_processed),
    },
    {
      key: "started_at",
      label: "Início",
      render: (row) => formatDateTime(row.started_at),
    },
    {
      key: "finished_at",
      label: "Fim",
      render: (row) => formatDateTime(row.finished_at),
    },
    {
      key: "created_at",
      label: "Criado em",
      render: (row) => formatDateTime(row.created_at),
    },
  ];

  return (
    <DataTable
      title="Pipeline Runs"
      description="Visão tabular das execuções registradas pelo backend FastAPI."
      columns={columns}
      rows={dashboard.pipelineRuns}
      emptyTitle="Nenhuma execução carregada"
      emptyDescription="Suba a API, rode a seed ou registre novas execuções para preencher esta grade."
    />
  );
}


export default PipelineRuns;
