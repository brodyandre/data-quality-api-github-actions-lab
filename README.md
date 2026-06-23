# data-quality-api-github-actions-lab

> Laboratório profissional para demonstrar CI/CD observável, debug de pipelines, service containers e evidências práticas com FastAPI, React/Vite e PostgreSQL.

![CI Placeholder](https://img.shields.io/badge/CI-em%20planejamento-0EA5E9?style=for-the-badge)
![Logs Placeholder](https://img.shields.io/badge/Logs-debug%20ready-0F172A?style=for-the-badge)
![Badge Placeholder](https://img.shields.io/badge/Status%20Badge-placeholder-22C55E?style=for-the-badge)
![Portfolio Placeholder](https://img.shields.io/badge/Portfolio-em%20construcao-F97316?style=for-the-badge)

<a id="indice"></a>

## Índice

- [Objetivo](#objetivo)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Como rodar](#como-rodar)
- [Endpoints](#endpoints)
- [Workflows](#workflows)
- [Debug e logs](#debug-e-logs)
- [Service containers](#service-containers)
- [Status badge](#status-badge)
- [Evidências visuais](#evidencias-visuais)
- [Troubleshooting](#troubleshooting)
- [Próximos passos](#proximos-passos)

<a id="objetivo"></a>

## Objetivo

Este repositório nasce como um laboratório de referência para demonstrar boas práticas de Engenharia de Dados, DevOps e CI/CD com foco em observabilidade. A proposta é evoluir uma aplicação simples, mas com pipelines ricos em logs, rastreabilidade, diagnóstico e evidências visuais para portfólio técnico.

Os principais temas previstos nesta trilha são:

- debug e leitura de logs no GitHub Actions
- métricas e insights sobre execuções
- uso de status badge
- job rodando em ambiente Ubuntu 22.04
- PostgreSQL como service container
- backend com FastAPI
- frontend com Node.js + React/Vite
- testes automatizados com evidências publicáveis

[⬆️ Retornar ao índice](#indice)

<a id="arquitetura"></a>

## Arquitetura

O laboratório está organizado para manter separação clara entre aplicação, banco, automação e documentação. A base atual já inclui backend FastAPI com SQL simples, scripts de migração e seeds, além de espaço dedicado para troubleshooting e evidências.

![Placeholder da arquitetura](docs/images/architecture-placeholder.svg)

Detalhes iniciais em [docs/architecture.md](docs/architecture.md).

[⬆️ Retornar ao índice](#indice)

<a id="tecnologias"></a>

## Tecnologias

| Camada | Tecnologia | Papel no laboratório |
| --- | --- | --- |
| Backend | FastAPI | API leve para auditoria e qualidade de dados |
| Banco | PostgreSQL | Persistência local e em service container |
| Acesso SQL | psycopg | Conexão direta e SQL simples, sem ORM |
| CI/CD | GitHub Actions | Pipelines, debug, logs, artefatos e badge |
| Containers | Docker Compose | Ambiente local rápido para desenvolvimento |
| Testes | Pytest | Validação unitária e integração com PostgreSQL |

[⬆️ Retornar ao índice](#indice)

<a id="como-rodar"></a>

## Como rodar

Fluxo local recomendado para o backend:

1. Copiar `.env.example` para `.env`.
2. Subir o PostgreSQL local com `make up`.
3. Preparar o ambiente Python com `make setup-backend`.
4. Aplicar a estrutura do banco com `make migrate`.
5. Carregar dados iniciais com `make seed`.
6. Executar a API com `make run-api`.
7. Rodar os testes com `make test-backend`.

Comandos principais:

- `make setup-backend`
- `make migrate`
- `make seed`
- `make test-backend`
- `make run-api`

[⬆️ Retornar ao índice](#indice)

<a id="endpoints"></a>

## Endpoints

Resumo da API atual:

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/health` | Verifica se a aplicação está viva |
| GET | `/ready` | Valida conexão com PostgreSQL e presença das tabelas |
| GET | `/pipeline-runs` | Lista execuções de pipeline |
| POST | `/pipeline-runs` | Registra uma nova execução |
| GET | `/quality-checks` | Lista validações de qualidade |
| POST | `/quality-checks` | Registra uma nova validação |
| GET | `/audit-logs` | Lista logs técnicos gerados pela API |
| GET | `/quality-summary` | Retorna um resumo agregado da operação |

Exemplo de payload para `POST /pipeline-runs`:

```json
{
  "pipeline_name": "daily_ingestion",
  "status": "success",
  "records_processed": 1250
}
```

Exemplo de payload para `POST /quality-checks`:

```json
{
  "pipeline_run_id": 1,
  "check_name": "null_rate_orders",
  "status": "passed",
  "severity": "low",
  "expected_value": "0%",
  "actual_value": "0%"
}
```

[⬆️ Retornar ao índice](#indice)

<a id="workflows"></a>

## Workflows

O diretório `.github/workflows/` foi preparado para receber pipelines com foco em:

- execução de testes automatizados
- coleta de logs e artefatos
- uso de service containers
- diagnóstico de falhas e troubleshooting
- publicação de badge de status

O backend já está preparado para funcionar com `DATABASE_URL`, o que simplifica o uso do PostgreSQL local e também do service container em GitHub Actions.

[⬆️ Retornar ao índice](#indice)

<a id="debug-e-logs"></a>

## Debug e logs

Um dos objetivos centrais deste laboratório é tratar o pipeline como fonte de observabilidade, não apenas como automação. A API atual já grava eventos simples em `audit_logs` ao registrar execuções e validações, criando uma base pequena e clara para troubleshooting.

Guia inicial em [docs/github-actions-debug-logs.md](docs/github-actions-debug-logs.md).

![Placeholder do workflow](docs/images/workflow-placeholder.svg)

[⬆️ Retornar ao índice](#indice)

<a id="service-containers"></a>

## Service containers

O projeto foi pensado para demonstrar duas camadas complementares:

- PostgreSQL local com Docker Compose para desenvolvimento
- PostgreSQL como service container em GitHub Actions para testes e validação em pipeline

Visão inicial em [docs/service-containers.md](docs/service-containers.md).

[⬆️ Retornar ao índice](#indice)

<a id="status-badge"></a>

## Status badge

O README já está pronto para receber um badge real do GitHub Actions assim que o primeiro workflow for criado. Até lá, os badges acima funcionam como placeholders visuais do laboratório.

Exemplo futuro:

```md
![CI](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/ci.yml/badge.svg)
```

[⬆️ Retornar ao índice](#indice)

<a id="evidencias-visuais"></a>

## Evidências visuais

Esta seção foi preparada para receber prints reais das execuções, resultados e artefatos do laboratório.

![Placeholder da galeria de evidências](docs/images/evidence-placeholder.svg)

Arquivos planejados em `docs/images/`:

- `pipeline-summary.png`
- `service-container-postgres.png`
- `tests-and-artifacts.png`
- `status-badge.png`

Organização complementar em [docs/evidence.md](docs/evidence.md).

[⬆️ Retornar ao índice](#indice)

<a id="troubleshooting"></a>

## Troubleshooting

O repositório também já reserva espaço para registrar incidentes, causas prováveis e ações corretivas. Isso ajuda a transformar falhas de pipeline em material de aprendizado e portfólio.

Referência inicial:

- [docs/troubleshooting.md](docs/troubleshooting.md)
- `docs/troubleshooting/`

[⬆️ Retornar ao índice](#indice)

<a id="proximos-passos"></a>

## Próximos passos

As próximas iterações naturais deste laboratório são:

1. criar o primeiro workflow de CI com logs detalhados
2. expandir validações de qualidade e cenários de falha
3. iniciar o frontend React/Vite para consumir os endpoints
4. publicar evidências visuais reais no diretório `docs/images`
5. adicionar métricas e artefatos de execução para portfólio

[⬆️ Retornar ao índice](#indice)
