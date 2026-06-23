# Arquitetura Inicial

## Visão geral

Este laboratório foi dividido para evidenciar responsabilidades técnicas e facilitar a evolução incremental do projeto.

## Blocos principais

- `backend/`: base da API em FastAPI
- `frontend/`: base da interface em Node.js + React/Vite
- `database/`: migrações e seeds do PostgreSQL
- `.github/workflows/`: pipelines e automação
- `docs/`: arquitetura, debug, evidências e troubleshooting
- `scripts/`: utilitários operacionais do laboratório
- `action/`: espaço reservado para experimentos com GitHub Action customizada

## Fluxo previsto

1. O frontend consumirá a API do backend.
2. O backend utilizará PostgreSQL localmente e em pipeline.
3. O GitHub Actions executará testes, publicará logs e gerará evidências.

## Diagrama de referência

```text
Frontend (React/Vite)
        |
        v
Backend (FastAPI)
        |
        v
PostgreSQL

GitHub Actions
  -> testes
  -> logs
  -> service containers
  -> badge
```

## Evolução esperada

Este documento receberá, nas próximas etapas, diagramas finais, fluxos de CI/CD e decisões arquiteturais mais detalhadas.
