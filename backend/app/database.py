from contextlib import contextmanager
from pathlib import Path
from typing import Any, Callable, Generator, Optional, TypeVar, Union

import psycopg
from psycopg.rows import dict_row

from app.config import get_settings


T = TypeVar("T")
REQUIRED_TABLES = ("pipeline_runs", "quality_checks", "audit_logs")


def get_database_url() -> str:
    database_url = get_settings().database_url
    if not database_url:
        raise RuntimeError("DATABASE_URL não configurada.")
    return database_url


@contextmanager
def get_connection() -> Generator[psycopg.Connection, None, None]:
    with psycopg.connect(get_database_url(), row_factory=dict_row) as connection:
        yield connection


def fetch_all(query: str, params: tuple[Any, ...] = ()) -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            return list(cursor.fetchall())


def fetch_one(query: str, params: tuple[Any, ...] = ()) -> Optional[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            return cursor.fetchone()


def execute_transaction(callback: Callable[[Any], T]) -> T:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            result = callback(cursor)
        connection.commit()
        return result


def ping_database() -> None:
    fetch_one("SELECT 1 AS ok")


def list_missing_tables() -> list[str]:
    rows = fetch_all(
        """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name IN ('pipeline_runs', 'quality_checks', 'audit_logs')
        """
    )
    existing_tables = {row["table_name"] for row in rows}
    return [table_name for table_name in REQUIRED_TABLES if table_name not in existing_tables]


def execute_sql_script(path: Union[str, Path]) -> None:
    script_path = Path(path)
    statements = [
        statement.strip()
        for statement in script_path.read_text(encoding="utf-8").split(";")
        if statement.strip()
    ]

    def runner(cursor: Any) -> None:
        for statement in statements:
            cursor.execute(statement)

    execute_transaction(runner)
