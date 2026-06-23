<h1 align="center">data-quality-api-github-actions-lab</h1>

<p align="center"><strong>Laboratório técnico de Engenharia de Dados, DevOps e CI/CD com foco em observabilidade, testes reais, service containers e automações reutilizáveis no GitHub Actions.</strong></p>

<p align="center">
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/ci.yml"><img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml"><img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml/badge.svg" alt="Integration PostgreSQL"></a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml"><img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml/badge.svg" alt="Debug Logs"></a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml"><img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml/badge.svg" alt="Docker Action Demo"></a>
</p>

<p align="center">
  <a href="#objetivo">Objetivo</a> •
  <a href="#frontend-nodejsreact">Frontend</a> •
  <a href="#github-actions-em-destaque">GitHub Actions</a> •
  <a href="#service-containers">Service Containers</a> •
  <a href="#status-badge">Badges</a>
</p>

<a id="indice"></a>

## Visão geral

Este projeto foi desenhado como um laboratório profissional para demonstrar, de forma objetiva, como estruturar um ambiente moderno com FastAPI, React/Vite, PostgreSQL e GitHub Actions. A proposta não é apenas subir uma aplicação, mas mostrar decisões práticas de engenharia em torno de automação, rastreabilidade, logs, service containers e evidências técnicas para portfólio.

O repositório combina quatro frentes principais:

- API de auditoria e qualidade de dados com SQL simples e foco em clareza
- interface gráfica para visualização operacional e técnica
- banco PostgreSQL preparado para uso local e em CI
- workflows de GitHub Actions cobrindo CI, integração real, debug/logs e Docker Action local

Destaques visuais do laboratório: `🔎 observabilidade`, `🧪 testes reais`, `🐘 PostgreSQL`, `⚙️ GitHub Actions`.

| Pilar | O que o projeto demonstra |
| --- | --- |
| `🔎` Observabilidade | Logs organizados, annotations, artifacts e troubleshooting orientado a evidências |
| `🧪` Integração real | Testes com PostgreSQL local e service container no GitHub Actions |
| `🖥️` Interface | Painel React/Vite com visão operacional e fallback amigável |
| `⚙️` Automação | CI tradicional, debug workflow e Docker Action local reutilizável |

[⬆️ Retornar ao índice](#indice)

## Índice

- [Objetivo](#objetivo)
- [Arquitetura](#arquitetura)
- [Stack utilizada](#stack-utilizada)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [Backend FastAPI](#backend-fastapi)
- [Frontend Node.js/React](#frontend-nodejsreact)
- [Banco PostgreSQL](#banco-postgresql)
- [GitHub Actions em destaque](#github-actions-em-destaque)
- [Service Containers](#service-containers)
- [Debug e logs](#debug-e-logs)
- [Validação local antes do push](#validacao-local-antes-do-push)
- [Status Badge](#status-badge)
- [Evidências visuais planejadas](#evidencias-visuais-planejadas)
- [Como inserir prints no README](#como-inserir-prints-no-readme)
- [Troubleshooting](#troubleshooting)
- [Principais habilidades demonstradas](#principais-habilidades-demonstradas)
- [Próximos passos](#proximos-passos)
- [Autor](#autor)

[⬆️ Retornar ao índice](#indice)

<a id="objetivo"></a>

## Objetivo

O objetivo deste laboratório é mostrar capacidade prática de construir um projeto pequeno, mas tecnicamente bem posicionado, para avaliação de maturidade em Engenharia de Dados, DevOps e CI/CD. O foco está em qualidade de execução, simplicidade arquitetural e boa comunicação técnica.

Temas centrais já contemplados ou preparados:

- observabilidade de pipelines no GitHub Actions
- logs organizados com grouping e annotations
- testes unitários e testes de integração com PostgreSQL real
- uso de service container em job container Ubuntu 22.04
- Docker Action local como exemplo de automação empacotada
- documentação preparada para prints, artifacts e troubleshooting

[⬆️ Retornar ao índice](#indice)

<a id="arquitetura"></a>

## Arquitetura

O laboratório segue uma separação clara entre aplicação, banco, automação e documentação. Isso facilita evolução incremental, leitura por recrutadores técnicos e reaproveitamento das peças em outros estudos ou demonstrações.

Camadas principais:

- `backend/`: API FastAPI, schemas, rotas, configuração e testes
- `frontend/`: painel React/Vite para visão operacional
- `database/`: migrations e seeds em SQL simples
- `.github/workflows/`: pipelines de CI/CD e demonstrações de Actions
- `action/`: Docker Action local para processar relatórios do pipeline
- `docs/`: arquitetura, troubleshooting, evidências e guias técnicos

Detalhes complementares em [docs/architecture.md](docs/architecture.md).

[⬆️ Retornar ao índice](#indice)

<a id="stack-utilizada"></a>

## Stack utilizada

| Camada | Tecnologia | Papel no laboratório |
| --- | --- | --- |
| Backend | FastAPI | API enxuta para auditoria e qualidade de dados |
| Banco | PostgreSQL | Persistência local e em integração real no CI |
| Acesso ao banco | psycopg | SQL direto, simples e estável |
| Frontend | React + Vite | Interface gráfica leve para visualização |
| Automação local | Makefile + Docker Compose | Atalhos de execução e banco local |
| CI/CD | GitHub Actions | Testes, logs, artifacts, badges e debugging |
| Testes | Pytest | Cobertura unitária e integração |
| Docker Action | Dockerfile + shell script | Exemplo de container como action |

[⬆️ Retornar ao índice](#indice)

<a id="estrutura-do-projeto"></a>

## Estrutura do projeto

```text
.
├── .github/workflows/
├── action/
├── backend/
│   ├── app/
│   └── tests/
├── database/
│   ├── migrations/
│   └── seeds/
├── docs/
│   ├── evidence/
│   ├── images/
│   └── troubleshooting/
├── frontend/
│   └── src/
├── scripts/
├── docker-compose.yml
├── Makefile
└── README.md
```

Pastas de maior interesse para avaliação:

- `.github/workflows/` concentra os cenários de CI, debug e integração
- `action/` demonstra como encapsular automação em uma Docker Action local
- `backend/tests/integration/` mostra testes reais com PostgreSQL
- `docs/` organiza evidências, troubleshooting e narrativa de portfólio

[⬆️ Retornar ao índice](#indice)

<a id="como-rodar-localmente"></a>

## Como rodar localmente

Fluxo recomendado para desenvolvimento local no WSL2 ou Linux:

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

Ordem prática de uso:

1. criar `.env` a partir de `.env.example`
2. preparar a `.venv` do backend sem instalar dependências globalmente
3. subir o PostgreSQL local com Docker Compose
4. aplicar migrations e seed
5. validar o backend com testes
6. instalar dependências do frontend
7. subir API e interface em terminais separados

URLs locais:

- API: `http://localhost:8000/docs`
- Frontend: `http://localhost:3000`

Comandos úteis:

- `make logs`
- `make db-shell`
- `make reset-db`
- `make build-frontend`
- `make down`

Se o Node local estiver antigo, rode `make setup-node` antes da instalação do frontend.

Se preferir preparar o backend manualmente sem `Makefile`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
```

[⬆️ Retornar ao índice](#indice)

<a id="backend-fastapi"></a>

## Backend FastAPI

O backend foi construído com foco em simplicidade, legibilidade e facilidade de manutenção. A API usa SQL simples com `psycopg`, leitura de configuração por `DATABASE_URL` e separação pequena entre configuração, rotas, schemas e acesso ao banco.

Endpoints disponíveis:

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/health` | Verifica se a aplicação está viva |
| GET | `/ready` | Valida conexão com PostgreSQL e presença das tabelas |
| GET | `/pipeline-runs` | Lista execuções de pipeline |
| POST | `/pipeline-runs` | Registra uma nova execução |
| GET | `/quality-checks` | Lista validações de qualidade |
| POST | `/quality-checks` | Registra uma nova validação |
| GET | `/audit-logs` | Lista eventos técnicos |
| GET | `/quality-summary` | Retorna um resumo agregado |

Pontos relevantes para avaliação técnica:

- sem ORM pesado
- scripts de migration e seed independentes
- testes unitários e integração já preparados
- compatível com execução local e com GitHub Actions

[⬆️ Retornar ao índice](#indice)

<a id="frontend-nodejsreact"></a>

## Frontend Node.js/React

O frontend foi pensado como uma camada visual de apoio ao laboratório, não como um dashboard genérico. A proposta é demonstrar leitura operacional de dados de qualidade, estado da aplicação e visibilidade sobre execuções.

Telas atuais:

- Overview
- Pipeline Runs
- Quality Checks
- Audit Logs
- Health Status

Características do frontend:

- React + Vite com estrutura leve
- CSS próprio, sem biblioteca pesada de UI
- fallback amigável quando a API estiver offline
- preparação explícita para screenshots futuros no README

Capturas atuais da interface:

<p align="center">
  <img src="docs/images/frontend-overview.png" alt="Overview do frontend" width="88%">
  <br>
  <sub><strong>Overview</strong>: visão consolidada de métricas e estado operacional.</sub>
</p>

<p align="center">
  <img src="docs/images/frontend-quality-checks.png" alt="Quality Checks no frontend" width="88%">
  <br>
  <sub><strong>Quality Checks</strong>: leitura rápida das validações e severidades.</sub>
</p>

<p align="center">
  <img src="docs/images/frontend-health-status.png" alt="Health Status no frontend" width="88%">
  <br>
  <sub><strong>Health Status</strong>: checagem visual da saúde da API e do banco.</sub>
</p>

[⬆️ Retornar ao índice](#indice)

<a id="banco-postgresql"></a>

## Banco PostgreSQL

O PostgreSQL é parte central da demonstração porque aparece em dois contextos distintos: desenvolvimento local e integração contínua no GitHub Actions.

No ambiente local:

- sobe via `docker-compose.yml`
- usa volume nomeado para persistência
- possui healthcheck
- utiliza variáveis do `.env`

No backend e nos scripts:

- migrations ficam em `database/migrations/`
- seeds ficam em `database/seeds/`
- a conexão é controlada por `DATABASE_URL`

Exemplo local:

```env
DATABASE_URL=postgresql://app_user:app_password@localhost:5432/data_quality_db
```

[⬆️ Retornar ao índice](#indice)

<a id="github-actions-em-destaque"></a>

## GitHub Actions em destaque

Este repositório foi estruturado para demonstrar diferentes padrões de automação no GitHub Actions, cada um com um objetivo técnico claro.

Workflows principais:

- `ci.yml`: valida backend e frontend em `push`, `pull_request` e `workflow_dispatch`
- `integration-postgres.yml`: executa integração real com PostgreSQL como service container
- `debug-logs.yml`: demonstra grouping, annotations, notices e artifacts
- `docker-action-demo.yml`: demonstra container como action usando `uses: ./action`

O laboratório cobre, em conjunto:

- CI tradicional de aplicação
- integração real com banco
- diagnóstico orientado por logs
- automação encapsulada em Docker Action local

Exemplo visual da Docker Action local em execução:

<p align="center">
  <img src="docs/images/actions-docker-action-demo.png" alt="Docker Action Demo no GitHub Actions" width="88%">
</p>

[⬆️ Retornar ao índice](#indice)

<a id="service-containers"></a>

## Service Containers

O workflow de integração foi preparado para mostrar um cenário que costuma aparecer em times reais: job rodando em container dedicado e banco separado como service container.

No caso deste projeto:

- o runner usa `ubuntu-latest`
- o job principal roda em `container: ubuntu:22.04`
- o PostgreSQL sobe como service container `postgres:16`
- a aplicação acessa o banco pelo hostname `postgres`

Isso é importante porque, dentro do job container, `localhost` aponta para o próprio container do job, não para o banco. O hostname correto passa a ser o nome declarado em `services`.

Referência complementar em [docs/service-containers.md](docs/service-containers.md).

Execução de integração com PostgreSQL no GitHub Actions:

<p align="center">
  <img src="docs/images/actions-postgres-service-container.png" alt="Workflow de integração com PostgreSQL" width="88%">
</p>

[⬆️ Retornar ao índice](#indice)

<a id="debug-e-logs"></a>

## Debug e logs

Observabilidade é um dos eixos mais fortes deste laboratório. O objetivo não é apenas executar pipelines, mas produzir saídas que facilitem leitura humana, troubleshooting e reaproveitamento em portfólio.

Elementos já demonstrados:

- `::group::` e `::endgroup::` para organizar blocos de log
- `::notice::`, `::warning::` e `::error::` em cenário controlado
- geração de artifacts como evidência textual
- uso de `ACTIONS_STEP_DEBUG` e `ACTIONS_RUNNER_DEBUG` como opção de debug avançado
- leitura de relatórios por Docker Action local

Materiais de apoio:

- [docs/github-actions-debug-logs.md](docs/github-actions-debug-logs.md)
- [docs/evidence.md](docs/evidence.md)

Logs agrupados e artifacts publicados pelo workflow:

<p align="center">
  <img src="docs/images/actions-debug-logs.png" alt="Workflow de debug e logs" width="49%">
  <img src="docs/images/actions-artifacts.png" alt="Artifacts do workflow" width="49%">
</p>

[⬆️ Retornar ao índice](#indice)

<a id="validacao-local-antes-do-push"></a>

## Validação local antes do push

Antes do push final, o projeto agora conta com uma rotina local de validação para reduzir risco de inconsistência entre código, documentação e automações.

Alvos disponíveis:

- `make validate-docs`: valida o README e a documentação essencial
- `make check`: valida estrutura, workflows, `.env.example`, migrations, testes do backend e build do frontend
- `make ci-local`: executa um fluxo local parecido com o CI, incluindo banco, migrations, seed e checks finais

Automação aplicada:

- `scripts/run_final_validation.sh` centraliza a sequência final de validação
- cria `.env` automaticamente se ele ainda não existir
- reaproveita a `.venv` e `frontend/node_modules` quando já estiverem prontos
- sobe o banco, aplica migration, carrega seed e executa `make check`

Fluxo recomendado:

```bash
make ci-local
```

Observações:

- `make check` não depende do GitHub Actions
- `make ci-local` também não depende do GitHub Actions, mas espera Docker Compose funcional
- a validação estrutural é feita por `scripts/check_project_structure.sh`
- a orquestração final é feita por `scripts/run_final_validation.sh`

[⬆️ Retornar ao índice](#indice)

<a id="status-badge"></a>

## Status Badge

Os badges do topo já apontam para `brodyandre/data-quality-api-github-actions-lab`. Se algum deles aparecer vazio por alguns instantes, normalmente basta aguardar a atualização do GitHub após a execução do workflow correspondente.

[⬆️ Retornar ao índice](#indice)

<a id="evidencias-visuais-planejadas"></a>

## Evidências visuais planejadas

Este README já incorpora parte das capturas reais do laboratório. A lista abaixo funciona como mapa do material visual disponível e das evidências que podem continuar enriquecendo o projeto.

Capturas disponíveis em `docs/images/`:

- `actions-postgres-service-container.png`
- `actions-debug-logs.png`
- `actions-artifacts.png`
- `actions-docker-action-demo.png`
- `frontend-overview.png`
- `frontend-quality-checks.png`
- `frontend-health-status.png`
- `status-badge.png`

[⬆️ Retornar ao índice](#indice)

<a id="como-inserir-prints-no-readme"></a>

## Como inserir prints no README

Fluxo recomendado para novas capturas:

1. salvar a imagem em `docs/images/` com nome coerente
2. registrar a evidência correspondente em `docs/evidence.md`
3. inserir a imagem apenas na seção em que ela realmente agrega contexto
4. manter legenda curta, técnica e sem repetir o texto do parágrafo

Contexto recomendado para cada print já capturado:

- `frontend-overview.png`: seção `Frontend Node.js/React`
- `frontend-quality-checks.png`: seção `Frontend Node.js/React`
- `frontend-health-status.png`: seção `Frontend Node.js/React`
- `actions-postgres-service-container.png`: seção `Service Containers`
- `actions-debug-logs.png`: seção `Debug e logs`
- `actions-artifacts.png`: seção `Debug e logs`
- `actions-docker-action-demo.png`: seção `GitHub Actions em destaque`
- `status-badge.png`: seção `Status Badge`

Boas práticas editoriais:

- evitar repetir a mesma imagem em múltiplas seções
- priorizar prints que tragam contexto operacional real
- substituir placeholders quando houver evidência melhor disponível

[⬆️ Retornar ao índice](#indice)

<a id="troubleshooting"></a>

## Troubleshooting

Os cenários de troubleshooting foram organizados para apoiar tanto uso local quanto leitura em contexto de portfólio.

Problemas comuns já mapeados:

- porta `5432` ocupada localmente
- falha de conexão com PostgreSQL
- incompatibilidade de versão do Node
- caminho incorreto em Docker Action local
- dúvidas sobre `.venv` no WSL2 e VSCode

Guias disponíveis:

- [docs/troubleshooting/postgres.md](docs/troubleshooting/postgres.md)
- [docs/troubleshooting/python-venv.md](docs/troubleshooting/python-venv.md)
- [docs/troubleshooting/docker-action.md](docs/troubleshooting/docker-action.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)

[⬆️ Retornar ao índice](#indice)

<a id="principais-habilidades-demonstradas"></a>

## Principais habilidades demonstradas

Este laboratório foi desenhado para evidenciar competências técnicas de forma prática e verificável:

- desenho de backend leve com FastAPI e SQL simples
- modelagem de ambiente local com Docker Compose
- uso de PostgreSQL em integração contínua com service container
- criação de workflows claros e orientados a diagnóstico
- uso profissional de logs, annotations e artifacts
- estruturação de documentação técnica para portfólio
- criação de Docker Action local para automação reutilizável
- integração entre backend, frontend, banco e pipelines

[⬆️ Retornar ao índice](#indice)

<a id="proximos-passos"></a>

## Próximos passos

Evoluções naturais para as próximas iterações:

1. capturar screenshots reais dos workflows e da interface
2. ampliar cenários de falha controlada para troubleshooting
3. adicionar mais validações de qualidade de dados e métricas
4. publicar artifacts adicionais com resumos de execução
5. refinar a camada visual do frontend com dados mais ricos
6. conectar badges finais ao repositório público definitivo

[⬆️ Retornar ao índice](#indice)

<a id="autor"></a>

## Autor

**Luiz André de Souza**

- GitHub: https://github.com/brodyandre
- LinkedIn: https://www.linkedin.com/in/luiz-andre-souza-data-engineer/

[⬆️ Retornar ao índice](#indice)
