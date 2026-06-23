from pathlib import Path
import sys


ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT_DIR / "backend"))

from app.database import execute_sql_script, get_database_url  # noqa: E402


def main() -> None:
    seed_path = ROOT_DIR / "database" / "seeds" / "seed_data.sql"
    get_database_url()
    execute_sql_script(seed_path)
    print(f"Seed aplicada: {seed_path.name}")


if __name__ == "__main__":
    main()
