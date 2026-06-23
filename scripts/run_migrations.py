from pathlib import Path
import sys


ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT_DIR / "backend"))

from app.database import execute_sql_script, get_database_url  # noqa: E402


def main() -> None:
    migration_path = ROOT_DIR / "database" / "migrations" / "001_create_tables.sql"
    get_database_url()
    execute_sql_script(migration_path)
    print(f"Migração aplicada: {migration_path.name}")


if __name__ == "__main__":
    main()
