from typing import Any

import psycopg
from fastapi import APIRouter, HTTPException, status

from app.database import execute_transaction, fetch_all, fetch_one, list_missing_tables, ping_database
from app.schemas import (
    AuditLogResponse,
    HealthResponse,
    PipelineRunCreate,
    PipelineRunResponse,
    QualityCheckCreate,
    QualityCheckResponse,
    QualitySummaryResponse,
    ReadyResponse,
)


router = APIRouter()


def raise_database_unavailable(exc: Exception) -> None:
    if isinstance(exc, RuntimeError):
        detail = str(exc)
    else:
        detail = "Banco de dados indisponível."
    raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=detail) from exc


def create_audit_log(cursor: Any, event_type: str, message: str) -> None:
    cursor.execute(
        """
        INSERT INTO audit_logs (event_type, message)
        VALUES (%s, %s)
        """,
        (event_type, message),
    )


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@router.get("/ready", response_model=ReadyResponse)
def ready() -> ReadyResponse:
    try:
        ping_database()
        missing_tables = list_missing_tables()
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    if missing_tables:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Tabelas ausentes: {', '.join(missing_tables)}",
        )

    return ReadyResponse(status="ready", database="ok")


@router.get("/pipeline-runs", response_model=list[PipelineRunResponse])
def list_pipeline_runs() -> list[PipelineRunResponse]:
    try:
        rows = fetch_all(
            """
            SELECT id, pipeline_name, status, records_processed, started_at, finished_at, created_at
            FROM pipeline_runs
            ORDER BY created_at DESC, id DESC
            """
        )
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return [PipelineRunResponse(**row) for row in rows]


@router.post(
    "/pipeline-runs",
    response_model=PipelineRunResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_pipeline_run(payload: PipelineRunCreate) -> PipelineRunResponse:
    try:
        record = execute_transaction(
            lambda cursor: _insert_pipeline_run(cursor, payload)
        )
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return PipelineRunResponse(**record)


def _insert_pipeline_run(cursor: Any, payload: PipelineRunCreate) -> dict[str, Any]:
    cursor.execute(
        """
        INSERT INTO pipeline_runs (
            pipeline_name,
            status,
            records_processed,
            started_at,
            finished_at
        )
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id, pipeline_name, status, records_processed, started_at, finished_at, created_at
        """,
        (
            payload.pipeline_name,
            payload.status,
            payload.records_processed,
            payload.started_at,
            payload.finished_at,
        ),
    )
    pipeline_run = cursor.fetchone()
    create_audit_log(
        cursor,
        "pipeline_run_created",
        f"Pipeline '{payload.pipeline_name}' registrada com status '{payload.status}'.",
    )
    return pipeline_run


@router.get("/quality-checks", response_model=list[QualityCheckResponse])
def list_quality_checks() -> list[QualityCheckResponse]:
    try:
        rows = fetch_all(
            """
            SELECT id, pipeline_run_id, check_name, status, severity, expected_value, actual_value, created_at
            FROM quality_checks
            ORDER BY created_at DESC, id DESC
            """
        )
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return [QualityCheckResponse(**row) for row in rows]


@router.post(
    "/quality-checks",
    response_model=QualityCheckResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_quality_check(payload: QualityCheckCreate) -> QualityCheckResponse:
    try:
        record = execute_transaction(
            lambda cursor: _insert_quality_check(cursor, payload)
        )
    except psycopg.errors.ForeignKeyViolation as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="pipeline_run_id informado não existe.",
        ) from exc
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return QualityCheckResponse(**record)


def _insert_quality_check(cursor: Any, payload: QualityCheckCreate) -> dict[str, Any]:
    cursor.execute(
        """
        INSERT INTO quality_checks (
            pipeline_run_id,
            check_name,
            status,
            severity,
            expected_value,
            actual_value
        )
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id, pipeline_run_id, check_name, status, severity, expected_value, actual_value, created_at
        """,
        (
            payload.pipeline_run_id,
            payload.check_name,
            payload.status,
            payload.severity,
            payload.expected_value,
            payload.actual_value,
        ),
    )
    quality_check = cursor.fetchone()
    create_audit_log(
        cursor,
        "quality_check_created",
        f"Validação '{payload.check_name}' registrada com status '{payload.status}'.",
    )
    return quality_check


@router.get("/audit-logs", response_model=list[AuditLogResponse])
def list_audit_logs() -> list[AuditLogResponse]:
    try:
        rows = fetch_all(
            """
            SELECT id, event_type, message, created_at
            FROM audit_logs
            ORDER BY created_at DESC, id DESC
            """
        )
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return [AuditLogResponse(**row) for row in rows]


@router.get("/quality-summary", response_model=QualitySummaryResponse)
def quality_summary() -> QualitySummaryResponse:
    try:
        row = fetch_one(
            """
            SELECT
                (SELECT COUNT(*) FROM pipeline_runs) AS total_pipeline_runs,
                (SELECT COUNT(*) FROM pipeline_runs WHERE LOWER(status) = 'success') AS successful_pipeline_runs,
                (SELECT COUNT(*) FROM pipeline_runs WHERE LOWER(status) = 'failed') AS failed_pipeline_runs,
                (SELECT COUNT(*) FROM quality_checks) AS total_quality_checks,
                (SELECT COUNT(*) FROM quality_checks WHERE LOWER(status) = 'passed') AS passed_quality_checks,
                (SELECT COUNT(*) FROM quality_checks WHERE LOWER(status) = 'failed') AS failed_quality_checks,
                (SELECT COUNT(*) FROM quality_checks WHERE LOWER(severity) = 'high') AS high_severity_checks,
                (SELECT COUNT(*) FROM audit_logs) AS total_audit_logs
            """
        )
    except (RuntimeError, psycopg.Error) as exc:
        raise_database_unavailable(exc)

    return QualitySummaryResponse(**row)
