from pathlib import Path

import psycopg
import pytest
from fastapi.testclient import TestClient

from app.config import get_settings
from app.database import execute_sql_script
from app.main import app


ROOT_DIR = Path(__file__).resolve().parents[3]
MIGRATION_FILE = ROOT_DIR / "database" / "migrations" / "001_create_tables.sql"


def get_test_database_url() -> str:
    database_url = get_settings().database_url
    if not database_url:
        pytest.skip("DATABASE_URL não configurada para testes de integração.")

    try:
        with psycopg.connect(database_url):
            pass
    except psycopg.OperationalError as exc:
        pytest.skip(f"PostgreSQL indisponível para testes de integração: {exc}")

    return database_url


def reset_database(database_url: str) -> None:
    execute_sql_script(MIGRATION_FILE)
    with psycopg.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "TRUNCATE TABLE quality_checks, pipeline_runs, audit_logs RESTART IDENTITY CASCADE"
            )
        connection.commit()


def test_api_crud_and_summary_with_postgres() -> None:
    database_url = get_test_database_url()
    reset_database(database_url)
    client = TestClient(app)

    ready_response = client.get("/ready")
    assert ready_response.status_code == 200
    assert ready_response.json() == {"status": "ready", "database": "ok"}

    pipeline_payload = {
        "pipeline_name": "nightly_quality_job",
        "status": "success",
        "records_processed": 42,
    }
    pipeline_response = client.post("/pipeline-runs", json=pipeline_payload)
    assert pipeline_response.status_code == 201
    pipeline_run = pipeline_response.json()
    assert pipeline_run["pipeline_name"] == "nightly_quality_job"
    assert pipeline_run["records_processed"] == 42

    quality_payload = {
        "pipeline_run_id": pipeline_run["id"],
        "check_name": "null_rate_check",
        "status": "passed",
        "severity": "low",
        "expected_value": "0%",
        "actual_value": "0%",
    }
    quality_response = client.post("/quality-checks", json=quality_payload)
    assert quality_response.status_code == 201
    quality_check = quality_response.json()
    assert quality_check["check_name"] == "null_rate_check"

    runs_response = client.get("/pipeline-runs")
    assert runs_response.status_code == 200
    assert len(runs_response.json()) == 1

    checks_response = client.get("/quality-checks")
    assert checks_response.status_code == 200
    assert len(checks_response.json()) == 1

    audit_logs_response = client.get("/audit-logs")
    assert audit_logs_response.status_code == 200
    assert len(audit_logs_response.json()) == 2

    summary_response = client.get("/quality-summary")
    assert summary_response.status_code == 200
    assert summary_response.json() == {
        "total_pipeline_runs": 1,
        "successful_pipeline_runs": 1,
        "failed_pipeline_runs": 0,
        "total_quality_checks": 1,
        "passed_quality_checks": 1,
        "failed_quality_checks": 0,
        "high_severity_checks": 0,
        "total_audit_logs": 2,
    }
