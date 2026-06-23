from pathlib import Path

import psycopg
import pytest

from app.config import get_settings
from app.database import execute_sql_script


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


def test_migration_creates_expected_tables() -> None:
    database_url = get_test_database_url()

    execute_sql_script(MIGRATION_FILE)

    with psycopg.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name IN ('pipeline_runs', 'quality_checks', 'audit_logs')
                ORDER BY table_name
                """
            )
            rows = [row[0] for row in cursor.fetchall()]

    assert rows == ["audit_logs", "pipeline_runs", "quality_checks"]
