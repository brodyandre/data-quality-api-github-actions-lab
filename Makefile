COMPOSE ?= docker compose
VENV_BIN ?= .venv/bin
PYTHON ?= python3

.PHONY: help up down logs ps db-shell reset-db setup-backend migrate seed test-backend run-api

help:
	@echo "Comandos disponiveis:"
	@echo "  make up             - sobe o PostgreSQL local"
	@echo "  make down           - derruba os containers locais"
	@echo "  make logs           - acompanha os logs do PostgreSQL"
	@echo "  make ps             - lista os containers do laboratorio"
	@echo "  make db-shell       - abre um psql no container PostgreSQL"
	@echo "  make reset-db       - recria o banco local do zero"
	@echo "  make setup-backend  - cria .venv e instala dependencias do backend"
	@echo "  make migrate        - aplica a migracao SQL inicial"
	@echo "  make seed           - carrega dados de exemplo"
	@echo "  make test-backend   - executa testes unitarios e de integracao"
	@echo "  make run-api        - sobe a API FastAPI localmente"

up:
	$(COMPOSE) up -d postgres

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f postgres

ps:
	$(COMPOSE) ps

db-shell:
	@set -a; [ -f .env ] && . ./.env; set +a; $(COMPOSE) exec postgres psql -U "$${POSTGRES_USER:-app_user}" -d "$${POSTGRES_DB:-data_quality_db}"

reset-db:
	$(COMPOSE) down -v
	$(COMPOSE) up -d postgres

setup-backend:
	$(PYTHON) -m venv .venv
	$(VENV_BIN)/pip install -r backend/requirements.txt

migrate:
	PYTHONPATH=backend $(VENV_BIN)/python scripts/run_migrations.py

seed: migrate
	PYTHONPATH=backend $(VENV_BIN)/python scripts/seed_database.py

test-backend:
	PYTHONPATH=backend $(VENV_BIN)/pytest backend/tests

run-api:
	set -a && [ -f .env ] && . ./.env && set +a && PYTHONPATH=backend $(VENV_BIN)/uvicorn app.main:app --host $${APP_HOST:-0.0.0.0} --port $${APP_PORT:-8000}
