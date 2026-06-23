COMPOSE ?= docker compose
NPM ?= npm
NODE_SETUP ?= bash scripts/setup_node.sh
VENV_BIN ?= .venv/bin
PYTHON ?= python3

.PHONY: help up down logs ps db-shell reset-db venv install-backend setup-backend migrate seed test-backend run-api setup-node setup-frontend run-frontend build-frontend lint-frontend validate-docs check ci-local

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
	@echo "  make validate-docs   - valida README e documentacao essencial"
	@echo "  make check           - valida estrutura, docs, testes backend e build frontend"
	@echo "  make ci-local        - executa um fluxo local semelhante ao CI"

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

validate-docs:
	@echo "Validando README e documentacao essencial..."
	@for file in README.md docs/architecture.md docs/evidence.md docs/service-containers.md docs/github-actions-debug-logs.md docs/troubleshooting.md docs/troubleshooting/postgres.md docs/troubleshooting/python-venv.md docs/troubleshooting/docker-action.md; do \
		if [ ! -f "$$file" ]; then \
			echo "Arquivo de documentacao ausente: $$file"; \
			exit 1; \
		fi; \
	done
	@grep -Fqx "## Visão geral" README.md || (echo "Secao ausente no README: ## Visão geral" && exit 1)
	@grep -Fqx "## Como rodar localmente" README.md || (echo "Secao ausente no README: ## Como rodar localmente" && exit 1)
	@grep -Fqx "## GitHub Actions em destaque" README.md || (echo "Secao ausente no README: ## GitHub Actions em destaque" && exit 1)
	@grep -Fqx "## Validação local antes do push" README.md || (echo "Secao ausente no README: ## Validação local antes do push" && exit 1)
	@grep -Fqx "## Troubleshooting" README.md || (echo "Secao ausente no README: ## Troubleshooting" && exit 1)
	@grep -Fqx "## Próximos passos" README.md || (echo "Secao ausente no README: ## Próximos passos" && exit 1)
	@echo "Documentacao validada com sucesso."

check: validate-docs
	@echo "Validando estrutura do projeto..."
	@bash scripts/check_project_structure.sh
	@echo "Executando testes do backend..."
	@$(MAKE) test-backend
	@echo "Gerando build do frontend..."
	@$(MAKE) build-frontend
	@echo "Check local concluido com sucesso."

ci-local:
	@bash scripts/run_final_validation.sh
