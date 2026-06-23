COMPOSE ?= docker compose
NPM ?= npm
NODE_SETUP ?= bash scripts/setup_node.sh
VENV_BIN ?= .venv/bin
PYTHON ?= python3

.PHONY: help up down logs ps db-shell reset-db venv install-backend setup-backend migrate seed test-backend run-api setup-node setup-frontend run-frontend build-frontend lint-frontend

help:
	@echo "Comandos disponiveis:"
	@echo "  make up              - sobe o PostgreSQL local"
	@echo "  make down            - derruba os containers locais"
	@echo "  make logs            - acompanha os logs do PostgreSQL"
	@echo "  make ps              - lista os containers do laboratorio"
	@echo "  make db-shell        - abre um psql no container PostgreSQL"
	@echo "  make reset-db        - recria o banco local do zero"
	@echo "  make venv            - cria o ambiente virtual Python em .venv"
	@echo "  make install-backend - atualiza pip e instala dependencias do backend na .venv"
	@echo "  make setup-backend   - cria .venv e instala dependencias do backend"
	@echo "  make migrate         - aplica a migracao SQL inicial"
	@echo "  make seed            - carrega dados de exemplo"
	@echo "  make test-backend    - executa testes unitarios e de integracao"
	@echo "  make run-api         - sobe a API FastAPI localmente"
	@echo "  make setup-node      - instala/ativa Node 20 via nvm para o frontend"
	@echo "  make setup-frontend  - instala dependencias do frontend React/Vite"
	@echo "  make run-frontend    - sobe o frontend em http://localhost:3000"
	@echo "  make build-frontend  - gera o build de producao do frontend"
	@echo "  make lint-frontend   - executa o lint do frontend"

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

venv:
	$(PYTHON) -m venv .venv

install-backend: venv
	$(VENV_BIN)/python -m pip install --upgrade pip
	$(VENV_BIN)/pip install -r backend/requirements.txt

setup-backend: install-backend

migrate:
	PYTHONPATH=backend $(VENV_BIN)/python scripts/run_migrations.py

seed: migrate
	PYTHONPATH=backend $(VENV_BIN)/python scripts/seed_database.py

test-backend:
	PYTHONPATH=backend $(VENV_BIN)/pytest backend/tests

run-api:
	set -a && [ -f .env ] && . ./.env && set +a && PYTHONPATH=backend $(VENV_BIN)/uvicorn app.main:app --host $${APP_HOST:-0.0.0.0} --port $${APP_PORT:-8000}

setup-node:
	$(NODE_SETUP) --install

setup-frontend:
	$(NODE_SETUP) -- bash -lc 'cd frontend && $(NPM) install'

run-frontend:
	$(NODE_SETUP) -- bash -lc 'cd frontend && $(NPM) run dev -- --host 0.0.0.0'

build-frontend:
	$(NODE_SETUP) -- bash -lc 'cd frontend && $(NPM) run build'

lint-frontend:
	$(NODE_SETUP) -- bash -lc 'cd frontend && $(NPM) run lint'
