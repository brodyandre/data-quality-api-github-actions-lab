COMPOSE ?= docker compose

.PHONY: help up down logs ps test

help:
	@echo "Comandos disponiveis:"
	@echo "  make up    - sobe o PostgreSQL local"
	@echo "  make down  - derruba os containers locais"
	@echo "  make logs  - acompanha os logs do PostgreSQL"
	@echo "  make ps    - lista os containers do laboratorio"
	@echo "  make test  - placeholder para a futura suite automatizada"

up:
	$(COMPOSE) up -d postgres

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f postgres

ps:
	$(COMPOSE) ps

test:
	@echo "Suite de testes ainda nao configurada nesta etapa inicial."
