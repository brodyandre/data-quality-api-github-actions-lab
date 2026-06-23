# data-quality-api-github-actions-lab

> Laboratório profissional para demonstrar CI/CD observável, debug de pipelines, service containers e evidências práticas com FastAPI, React/Vite e PostgreSQL.

[![CI](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/ci.yml)
[![Integration Postgres](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml/badge.svg)](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml)
[![Debug Logs](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml/badge.svg)](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml)
[![Docker Action Demo](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml/badge.svg)](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml)
![Logs Placeholder](https://img.shields.io/badge/Logs-debug%20ready-0F172A?style=for-the-badge)
![Badge Placeholder](https://img.shields.io/badge/Status%20Badge-placeholder-22C55E?style=for-the-badge)
![Portfolio Placeholder](https://img.shields.io/badge/Portfolio-em%20construcao-F97316?style=for-the-badge)

<a id="indice"></a>

## Índice

- [Objetivo](#objetivo)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
- [Ambiente Python](#ambiente-python)
- [Endpoints](#endpoints)
- [Interface gráfica](#interface-grafica)
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

O laboratório está organizado para manter separação clara entre aplicação, banco, automação e documentação. A base atual já inclui backend FastAPI com SQL simples, scripts de migração e seeds, um frontend React + Vite e espaço dedicado para troubleshooting e evidências.

![Placeholder da arquitetura](docs/images/architecture-placeholder.svg)

Detalhes iniciais em [docs/architecture.md](docs/architecture.md).

[⬆️ Retornar ao índice](#indice)

<a id="tecnologias"></a>

## Tecnologias

| Camada | Tecnologia | Papel no laboratório |
| --- | --- | --- |
| Backend | FastAPI | API leve para auditoria e qualidade de dados |
| Frontend | React + Vite | Interface gráfica moderna para status, auditoria e qualidade |
| Banco | PostgreSQL | Persistência local e em service container |
| Acesso SQL | psycopg | Conexão direta e SQL simples, sem ORM |
| CI/CD | GitHub Actions | Pipelines, debug, logs, artefatos e badge |
| Containers | Docker Compose | Ambiente local rápido para desenvolvimento |
| Testes | Pytest | Validação unitária e integração com PostgreSQL |

[⬆️ Retornar ao índice](#indice)

<a id="como-rodar-localmente"></a>

## Como rodar localmente

Fluxo recomendado para subir backend, banco e interface gráfica:

1. copiar `.env.example` para `.env`
2. criar o ambiente Python com `make setup-backend`
3. subir o banco com `make up`
4. conferir o status com `make ps`
5. aplicar a migração com `make migrate`
6. carregar dados de exemplo com `make seed`
7. validar o backend com `make test-backend`
8. instalar o frontend com `make setup-frontend`
9. subir a API com `make run-api`
10. em outro terminal, subir a interface com `make run-frontend`

Se o Node local estiver antigo, rode antes:

```bash
make setup-node
```

Esse alvo instala e ativa Node 20 via `nvm` para eliminar avisos de engine do frontend.

Comandos em ordem:

```bash
cp .env.example .env
make setup-backend
make up
make ps
make migrate
make seed
make test-backend
make setup-node
make setup-frontend
make run-api
make run-frontend
```

Se quiser testar a API manualmente, rode `make run-api` antes do frontend. Para gerar o bundle visual do painel, use `make build-frontend`.

Comandos úteis:

- `make logs`
- `make db-shell`
- `make reset-db`
- `make venv`
- `make install-backend`
- `make setup-node`
- `make lint-frontend`
- `make down`

[⬆️ Retornar ao índice](#indice)

<a id="ambiente-python"></a>

## Ambiente Python

O backend foi preparado para desenvolvimento local com `.venv`, sem instalar dependências globalmente. Esse fluxo funciona bem no WSL2 e no VSCode, mas não é obrigatório para quem prefere usar apenas Docker Compose para banco e serviços auxiliares.

Criação manual da `.venv`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
```

Automação equivalente pelo `Makefile`:

```bash
make venv
make install-backend
make setup-backend
```

Ativação da `.venv` no WSL:

```bash
source .venv/bin/activate
```

Como selecionar o interpretador no VSCode:

1. abra a paleta com `Ctrl+Shift+P`
2. execute `Python: Select Interpreter`
3. escolha `${workspaceFolder}/.venv/bin/python`

Como validar `python`, `pip` e `pytest`:

```bash
python --version
pip --version
pytest --version
```

Se quiser validar a suíte completa do backend depois:

```bash
make test-backend
```

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

<a id="interface-grafica"></a>

## Interface gráfica

O frontend foi desenhado como um command center visual para demonstrar monitoramento técnico com linguagem de portfólio. Ele consome a API real quando disponível e entra em modo de fallback amigável quando o backend estiver offline.

Telas atuais:

- Overview com métricas agregadas de pipelines, falhas, alertas e taxa de sucesso
- Pipeline Runs com tabela de execuções
- Quality Checks com tabela de validações
- Audit Logs com tabela de eventos técnicos
- Health Status com status da API e do banco

URLs locais:

- API: http://localhost:8000/docs
- Frontend: http://localhost:3000

Placeholders preparados para prints:

- `docs/images/frontend-overview.png`
- `docs/images/frontend-quality-checks.png`
- `docs/images/frontend-health-status.png`

[⬆️ Retornar ao índice](#indice)

<a id="workflows"></a>

## Workflows

O diretório `.github/workflows/` foi preparado para receber pipelines com foco em:

- execução de testes automatizados
- coleta de logs e artefatos
- uso de service containers
- diagnóstico de falhas e troubleshooting
- publicação de badge de status

O workflow básico de CI agora executa:

- `backend-checks` para instalar dependências Python, rodar testes unitários e validar o import do FastAPI
- `frontend-checks` para instalar dependências Node e gerar o build do painel React + Vite
- gatilhos em `pull_request`, `push` na `main` e `workflow_dispatch`
- logs organizados com `::group::`, `::endgroup::`, `notice` e `warning`

O workflow principal de integração com PostgreSQL adiciona uma trilha mais próxima do ambiente real:

- job executando em `ubuntu-latest`, mas dentro de `container: ubuntu:22.04`
- `postgres:16` como service container com healthcheck por `pg_isready`
- `DATABASE_URL` apontando para `postgresql://app_user:app_password@postgres:5432/data_quality_db`
- execução de migrations, seed e testes de integração reais
- artifact com relatório simples em `artifacts/integration-report.txt`

O workflow `debug-logs.yml` foi criado para estudo direto de observabilidade no GitHub Actions:

- acionamento por `workflow_dispatch` e `push` na `main`
- uso explícito de `::group::`, `::endgroup::`, `::notice::`, `::warning::` e `::error::`
- simulação segura de validação de ambiente, dependências, testes e relatório
- upload do artifact `artifacts/debug-report.txt`
- comentários no YAML sobre `ACTIONS_STEP_DEBUG` e `ACTIONS_RUNNER_DEBUG`

O workflow `docker-action-demo.yml` demonstra o padrão de container como action:

- gera `artifacts/sample-report.txt` antes da execução
- usa a action local `./action` com input `report-path`
- empacota a lógica em `action/Dockerfile` e `action/entrypoint.sh`
- lê o relatório dentro do workspace e imprime um resumo simples no log
- falha com mensagem clara se o arquivo informado não existir

Nesse modelo, o container não é um service da aplicação. Ele encapsula a própria action, o que ajuda a demonstrar reaproveitamento, portabilidade e isolamento de uma automação pequena e objetiva.

Como ainda não existe `remote` Git configurado neste clone local, o badge acima foi deixado em formato pronto para o GitHub. Depois do primeiro push, troque `SEU-USUARIO` pelo owner real do repositório para ativar o badge final.

[⬆️ Retornar ao índice](#indice)

<a id="debug-e-logs"></a>

## Debug e logs

Um dos objetivos centrais deste laboratório é tratar o pipeline como fonte de observabilidade, não apenas como automação. A API atual já grava eventos simples em `audit_logs` ao registrar execuções e validações, e o workflow `debug-logs.yml` transforma esse tema em uma demonstração isolada de logs profissionais, annotations e artifacts.

O fluxo cobre:

- validação de ambiente do runner
- validação de dependências
- simulação de execução de testes
- geração de relatório em artifact
- uso controlado de `warning` e `error` sem quebrar o workflow

Além disso, o laboratório agora inclui uma Docker Action local para ler relatórios gerados no pipeline e transformar esse conteúdo em um resumo curto e reutilizável no próprio GitHub Actions.

O debug avançado pode ser ativado no repositório com `ACTIONS_STEP_DEBUG=true` e `ACTIONS_RUNNER_DEBUG=true` via Variable ou Secret, quando for interessante ampliar o nível de detalhe.

Guia inicial em [docs/github-actions-debug-logs.md](docs/github-actions-debug-logs.md).

Placeholders preparados para prints:

- `docs/images/actions-debug-logs.png`
- `docs/images/actions-artifacts.png`
- `docs/images/actions-docker-action-demo.png`

[⬆️ Retornar ao índice](#indice)

<a id="service-containers"></a>

## Service containers

O projeto foi pensado para demonstrar duas camadas complementares:

- PostgreSQL local com Docker Compose para desenvolvimento
- PostgreSQL como service container em GitHub Actions para testes e validação em pipeline

No workflow `integration-postgres.yml`, o job roda dentro de `ubuntu:22.04` e conversa com o banco usando o hostname `postgres`, que é o nome do service container dentro da rede interna do job. Isso permite validar migrations, seed e testes de integração sem depender de infraestrutura externa.

Visão inicial em [docs/service-containers.md](docs/service-containers.md).

[⬆️ Retornar ao índice](#indice)

<a id="status-badge"></a>

## Status badge

Os workflows `CI`, `Integration Postgres`, `Debug Logs` e `Docker Action Demo` já estão preparados para publicar badges de status assim que o repositório estiver no GitHub com o owner correto nos links.

Exemplos futuros:

```md
![CI](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/ci.yml/badge.svg)
![Integration Postgres](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml/badge.svg)
![Debug Logs](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml/badge.svg)
![Docker Action Demo](https://github.com/SEU-USUARIO/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml/badge.svg)
```

[⬆️ Retornar ao índice](#indice)

<a id="evidencias-visuais"></a>

## Evidências visuais

Esta seção foi preparada para receber prints reais das execuções, resultados e artefatos do laboratório.

![Placeholder da galeria de evidências](docs/images/evidence-placeholder.svg)

Arquivos planejados em `docs/images/`:

- `pipeline-summary.png`
- `service-container-postgres.png`
- `actions-postgres-service-container.png`
- `actions-debug-logs.png`
- `actions-artifacts.png`
- `actions-docker-action-demo.png`
- `tests-and-artifacts.png`
- `status-badge.png`
- `frontend-overview.png`
- `frontend-quality-checks.png`
- `frontend-health-status.png`

Organização complementar em [docs/evidence.md](docs/evidence.md).

[⬆️ Retornar ao índice](#indice)

<a id="troubleshooting"></a>

## Troubleshooting

Se a porta `5432` estiver ocupada, ajuste `POSTGRES_PORT` e `DATABASE_URL` no `.env` para uma porta livre antes de rodar `make up`.

Exemplo:

```env
POSTGRES_PORT=55432
DATABASE_URL=postgresql://app_user:app_password@localhost:55432/data_quality_db
```

Se o frontend abrir, mas não carregar dados, confirme que a API está rodando em `http://localhost:8000` e que a tela Health Status está apontando o backend como online.

Se aparecer aviso de engine do Node ou falha por versão incompatível, rode `make setup-node` para instalar/usar Node 20 automaticamente via `nvm`.

Se a Docker Action local falhar por arquivo ausente ou caminho incorreto, revise o `report-path` e consulte o guia específico de troubleshooting.

Referências rápidas:

- [docs/troubleshooting.md](docs/troubleshooting.md)
- [docs/troubleshooting/docker-action.md](docs/troubleshooting/docker-action.md)
- [docs/troubleshooting/postgres.md](docs/troubleshooting/postgres.md)
- [docs/troubleshooting/python-venv.md](docs/troubleshooting/python-venv.md)

[⬆️ Retornar ao índice](#indice)

<a id="proximos-passos"></a>

## Próximos passos

As próximas iterações naturais deste laboratório são:

1. criar o primeiro workflow de CI com logs detalhados
2. expandir validações de qualidade e cenários de falha
3. adicionar filtros, ordenação e captura de insights por tela
4. publicar evidências visuais reais no diretório `docs/images`
5. adicionar métricas e artefatos de execução para portfólio

[⬆️ Retornar ao índice](#indice)
