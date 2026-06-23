<h1 align="center">data-quality-api-github-actions-lab</h1>

<p align="center">
  <strong>Laboratório profissional de Engenharia de Dados, DevOps e CI/CD com FastAPI, React, PostgreSQL, Docker e GitHub Actions.</strong>
</p>

<p align="center">
  Projeto focado em <strong>observabilidade</strong>, <strong>debug de pipelines</strong>, <strong>service containers</strong>, <strong>testes de integração reais</strong> e <strong>documentação técnica orientada a portfólio</strong>.
</p>

<p align="center">
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/ci.yml">
    <img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml">
    <img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/integration-postgres.yml/badge.svg" alt="Integration PostgreSQL">
  </a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml">
    <img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/debug-logs.yml/badge.svg" alt="Debug Logs">
  </a>
  <a href="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml">
    <img src="https://github.com/brodyandre/data-quality-api-github-actions-lab/actions/workflows/docker-action-demo.yml/badge.svg" alt="Docker Action Demo">
  </a>
</p>

<p align="center">
  <a href="#objetivo">Objetivo</a> •
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#como-rodar-localmente">Execução local</a> •
  <a href="#github-actions-em-destaque">GitHub Actions</a> •
  <a href="#evidencias-tecnicas">Evidências</a> •
  <a href="#autor">Autor</a>
</p>

<a id="indice"></a>

---

## Visão geral

Este repositório demonstra, de forma prática, como estruturar uma aplicação pequena, porém profissional, usando **backend FastAPI**, **frontend React/Vite**, **PostgreSQL**, **Docker Compose** e **GitHub Actions**.

O foco principal não é apenas criar uma aplicação funcional, mas evidenciar práticas importantes para ambientes reais de engenharia:

- automação de validações com GitHub Actions;
- testes unitários e testes de integração com PostgreSQL;
- uso de PostgreSQL como **service container** no CI;
- execução de job em container baseado em Ubuntu 22.04;
- organização de logs com grupos, notices, warnings e artifacts;
- criação de uma Docker Action local;
- documentação técnica clara, visual e orientada a portfólio.

| Pilar | O que o projeto demonstra |
| --- | --- |
| `🔎` Observabilidade | Logs organizados, annotations, artifacts e troubleshooting |
| `🧪` Testes reais | Validações unitárias e integração com PostgreSQL |
| `🐘` Banco de dados | PostgreSQL local e PostgreSQL como service container |
| `⚙️` CI/CD | Workflows para backend, frontend, debug e Docker Action |
| `🖥️` Interface | Dashboard React/Vite para leitura operacional da aplicação |

[⬆️ Retornar ao índice](#indice)

---

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
- [Evidências técnicas](#evidencias-tecnicas)
- [Troubleshooting](#troubleshooting)
- [Principais habilidades demonstradas](#principais-habilidades-demonstradas)
- [Próximos passos](#proximos-passos)
- [Autor](#autor)

[⬆️ Retornar ao índice](#indice)

---

<a id="objetivo"></a>

## Objetivo

O objetivo deste laboratório é demonstrar domínio prático sobre **GitHub Actions**, **debug de pipelines**, **logs estruturados**, **service containers** e **testes automatizados** em um cenário próximo de aplicações reais.

A aplicação simula uma plataforma simples de auditoria e qualidade de dados, capaz de registrar execuções de pipelines, validações de qualidade e eventos técnicos.

O projeto foi desenhado para evidenciar competências aplicáveis em contextos de:

- Engenharia de Dados;
- DevOps;
- Cloud;
- CI/CD;
- automação de testes;
- observabilidade de pipelines;
- documentação técnica para ambientes profissionais.

Temas centrais demonstrados:

- API FastAPI com SQL simples;
- PostgreSQL local via Docker Compose;
- PostgreSQL como service container no GitHub Actions;
- job container com Ubuntu 22.04;
- frontend React/Vite para visualização operacional;
- logs agrupados, annotations e artifacts;
- Docker Action local;
- README estruturado com evidências técnicas.

[⬆️ Retornar ao índice](#indice)

---

<a id="arquitetura"></a>

## Arquitetura

O projeto segue uma arquitetura simples, modular e fácil de validar.

```text
┌──────────────────────────────┐
│        Frontend React         │
│        Vite + CSS             │
│        localhost:3000         │
└───────────────┬──────────────┘
                │
                │ HTTP/REST
                ▼
┌──────────────────────────────┐
│        Backend FastAPI        │
│        localhost:8000         │
└───────────────┬──────────────┘
                │
                │ SQL
                ▼
┌──────────────────────────────┐
│        PostgreSQL             │
│        Docker Compose local   │
│        Service container CI   │
└──────────────────────────────┘
```

Camadas principais:

- `backend/`: API FastAPI, rotas, schemas, configuração, acesso ao banco e testes;
- `frontend/`: interface React/Vite para visualização de métricas e status;
- `database/`: migrations e seeds em SQL;
- `.github/workflows/`: workflows de CI, integração, debug e Docker Action;
- `action/`: Docker Action local;
- `docs/`: arquitetura, evidências e troubleshooting.

Documentação complementar:

- [docs/architecture.md](docs/architecture.md)
- [docs/service-containers.md](docs/service-containers.md)
- [docs/github-actions-debug-logs.md](docs/github-actions-debug-logs.md)
- [docs/evidence.md](docs/evidence.md)

[⬆️ Retornar ao índice](#indice)

---

<a id="stack-utilizada"></a>

## Stack utilizada

| Camada | Tecnologia | Papel no projeto |
| --- | --- | --- |
| Backend | FastAPI | API para auditoria e qualidade de dados |
| Banco de dados | PostgreSQL | Persistência local e integração real no CI |
| Acesso ao banco | psycopg | Execução de SQL simples e direto |
| Frontend | React + Vite | Interface gráfica leve e moderna |
| Testes | Pytest | Testes unitários e de integração |
| Automação local | Makefile | Atalhos para setup, testes e validação |
| Containers locais | Docker Compose | PostgreSQL local para desenvolvimento |
| CI/CD | GitHub Actions | Workflows de validação e automação |
| Docker Action | Dockerfile + Shell Script | Exemplo de action baseada em container |

[⬆️ Retornar ao índice](#indice)

---

<a id="estrutura-do-projeto"></a>

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── integration-postgres.yml
│       ├── debug-logs.yml
│       └── docker-action-demo.yml
│
├── action/
│   ├── action.yml
│   ├── Dockerfile
│   └── entrypoint.sh
│
├── backend/
│   ├── app/
│   └── tests/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── docs/
│   ├── evidence/
│   ├── images/
│   └── troubleshooting/
│
├── frontend/
│   └── src/
│
├── scripts/
├── docker-compose.yml
├── Makefile
└── README.md
```

Pastas de maior interesse técnico:

| Pasta | Finalidade |
| --- | --- |
| `.github/workflows/` | Workflows de CI, integração, debug e Docker Action |
| `backend/tests/integration/` | Testes com PostgreSQL real |
| `database/migrations/` | Estrutura SQL do banco |
| `action/` | Docker Action local reutilizável |
| `docs/images/` | Evidências visuais do projeto |
| `docs/troubleshooting/` | Guias de resolução de problemas |

[⬆️ Retornar ao índice](#indice)

---

<a id="como-rodar-localmente"></a>

## Como rodar localmente

Fluxo recomendado para WSL2 ou Linux:

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

A aplicação ficará disponível em:

| Serviço | URL |
| --- | --- |
| API FastAPI | `http://localhost:8000/docs` |
| Frontend React/Vite | `http://localhost:3000` |
| PostgreSQL | `localhost:5432` |

Comandos úteis:

```bash
make logs
make db-shell
make reset-db
make build-frontend
make down
```

Preparação manual do ambiente Python, caso necessário:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
```

Observação: se o Node.js local estiver antigo, execute o alvo de preparação definido no projeto antes de instalar as dependências do frontend.

[⬆️ Retornar ao índice](#indice)

---

<a id="backend-fastapi"></a>

## Backend FastAPI

O backend foi implementado com foco em simplicidade, clareza e testabilidade.

A API usa:

- FastAPI;
- SQL simples;
- `psycopg`;
- configuração via `DATABASE_URL`;
- scripts independentes para migration e seed;
- testes unitários e testes de integração.

Endpoints disponíveis:

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/health` | Verifica se a aplicação está ativa |
| GET | `/ready` | Valida conexão com PostgreSQL |
| GET | `/pipeline-runs` | Lista execuções de pipeline |
| POST | `/pipeline-runs` | Registra uma execução de pipeline |
| GET | `/quality-checks` | Lista validações de qualidade |
| POST | `/quality-checks` | Registra uma validação |
| GET | `/audit-logs` | Lista eventos técnicos |
| GET | `/quality-summary` | Retorna resumo agregado de qualidade |

Pontos técnicos demonstrados:

- separação entre rotas, schemas, configuração e banco;
- uso de SQL direto sem ORM pesado;
- validação da aplicação com Pytest;
- compatibilidade com execução local e GitHub Actions.

[⬆️ Retornar ao índice](#indice)

---

<a id="frontend-nodejsreact"></a>

## Frontend Node.js/React

O frontend foi criado com React + Vite para oferecer uma visão visual da aplicação.

Ele funciona como um painel operacional para consultar execuções de pipelines, validações de qualidade, logs e estado da aplicação.

Telas disponíveis:

- Overview;
- Pipeline Runs;
- Quality Checks;
- Audit Logs;
- Health Status.

Características:

- React + Vite;
- CSS próprio;
- layout limpo e moderno;
- fallback amigável quando a API está offline;
- estrutura simples para manutenção e evolução.

Capturas da interface:

<p align="center">
  <img src="docs/images/frontend-overview.png" alt="Overview do frontend" width="88%">
  <br>
  <sub><strong>Overview</strong>: visão consolidada de métricas e estado operacional.</sub>
</p>

<p align="center">
  <img src="docs/images/frontend-quality-checks.png" alt="Quality Checks no frontend" width="88%">
  <br>
  <sub><strong>Quality Checks</strong>: visualização das validações de qualidade e severidade.</sub>
</p>

<p align="center">
  <img src="docs/images/frontend-health-status.png" alt="Health Status no frontend" width="88%">
  <br>
  <sub><strong>Health Status</strong>: leitura visual da saúde da API e do banco.</sub>
</p>

[⬆️ Retornar ao índice](#indice)

---

<a id="banco-postgresql"></a>

## Banco PostgreSQL

O PostgreSQL é usado em dois contextos:

1. desenvolvimento local com Docker Compose;
2. integração contínua no GitHub Actions como service container.

No ambiente local, o banco possui:

- container dedicado;
- healthcheck;
- volume nomeado;
- variáveis via `.env`;
- migrations e seeds em SQL.

Exemplo de conexão local:

```env
DATABASE_URL=postgresql://app_user:app_password@localhost:5432/data_quality_db
```

No GitHub Actions, a conexão usa o hostname do service container:

```env
DATABASE_URL=postgresql://app_user:app_password@postgres:5432/data_quality_db
```

Esse detalhe é importante porque, quando o job roda dentro de um container, o banco não é acessado por `localhost`, mas pelo nome do serviço definido no workflow.

[⬆️ Retornar ao índice](#indice)

---

<a id="github-actions-em-destaque"></a>

## GitHub Actions em destaque

O projeto possui workflows com objetivos distintos, facilitando a leitura técnica do que está sendo validado.

| Workflow | Finalidade |
| --- | --- |
| `ci.yml` | Valida backend e frontend |
| `integration-postgres.yml` | Executa testes de integração com PostgreSQL como service container |
| `debug-logs.yml` | Demonstra logs agrupados, annotations e artifacts |
| `docker-action-demo.yml` | Demonstra uma Docker Action local |

O conjunto dos workflows demonstra:

- CI tradicional;
- execução de testes;
- integração com banco real;
- debug estruturado;
- uso de artifacts;
- action customizada baseada em container;
- documentação por evidência visual.

Exemplo da Docker Action local em execução:

<p align="center">
  <img src="docs/images/actions-docker-action-demo.png" alt="Docker Action Demo no GitHub Actions" width="88%">
  <br>
  <sub><strong>Docker Action Demo</strong>: action local baseada em container executada dentro do GitHub Actions.</sub>
</p>

[⬆️ Retornar ao índice](#indice)

---

<a id="service-containers"></a>

## Service Containers

O workflow `integration-postgres.yml` demonstra um cenário importante do GitHub Actions: executar testes contra um banco real usando **PostgreSQL como service container**.

Neste projeto:

- o runner utiliza `ubuntu-latest`;
- o job principal roda em `container: ubuntu:22.04`;
- o PostgreSQL sobe como `postgres:16`;
- os testes acessam o banco pelo hostname `postgres`;
- migrations e seed são executados antes dos testes.

Esse padrão é útil para validar aplicações que dependem de banco sem precisar manter infraestrutura externa.

Execução do workflow com PostgreSQL:

<p align="center">
  <img src="docs/images/actions-postgres-service-container.png" alt="Workflow de integração com PostgreSQL" width="88%">
  <br>
  <sub><strong>Service Container PostgreSQL</strong>: validação de integração real no GitHub Actions.</sub>
</p>

Documentação complementar:

- [docs/service-containers.md](docs/service-containers.md)

[⬆️ Retornar ao índice](#indice)

---

<a id="debug-e-logs"></a>

## Debug e logs

A observabilidade dos workflows é um dos pontos centrais do projeto.

O workflow `debug-logs.yml` demonstra recursos úteis para diagnóstico em pipelines:

- `::group::` e `::endgroup::` para organizar logs;
- `::notice::` para mensagens informativas;
- `::warning::` para alertas controlados;
- `::error::` em cenário documentado;
- geração de artifacts;
- relatório textual de execução;
- referência ao uso de `ACTIONS_STEP_DEBUG` e `ACTIONS_RUNNER_DEBUG`.

Exemplo de logs e artifacts:

<p align="center">
  <img src="docs/images/actions-debug-logs.png" alt="Workflow de debug e logs" width="49%">
  <img src="docs/images/actions-artifacts.png" alt="Artifacts do workflow" width="49%">
  <br>
  <sub><strong>Debug Logs e Artifacts</strong>: logs organizados e evidências exportadas pelo workflow.</sub>
</p>

Documentação complementar:

- [docs/github-actions-debug-logs.md](docs/github-actions-debug-logs.md)
- [docs/evidence.md](docs/evidence.md)

[⬆️ Retornar ao índice](#indice)

---

<a id="validacao-local-antes-do-push"></a>

## Validação local antes do push

O projeto possui comandos para validar localmente a estrutura, a aplicação e a documentação antes de enviar alterações ao GitHub.

Alvos disponíveis:

| Comando | Finalidade |
| --- | --- |
| `make validate-docs` | Valida documentação essencial |
| `make check` | Valida estrutura, workflows, migrations, testes e build |
| `make ci-local` | Executa um fluxo local semelhante ao CI |

Fluxo recomendado:

```bash
make ci-local
```

A validação local permite reduzir falhas antes do push e reforça uma prática comum em projetos profissionais: testar localmente antes de depender do CI remoto.

Arquivos relacionados:

- `scripts/check_project_structure.sh`
- `scripts/run_final_validation.sh`

[⬆️ Retornar ao índice](#indice)

---

<a id="status-badge"></a>

## Status Badge

Os badges no topo do README mostram o estado atual dos workflows do GitHub Actions.

Eles ajudam a comunicar rapidamente se os principais pipelines do projeto estão executando com sucesso.

Workflows com badge:

- CI;
- Integration PostgreSQL;
- Debug Logs;
- Docker Action Demo.

Exemplo visual:

<p align="center">
  <img src="docs/images/status-badge.png" alt="Status badges do README" width="88%">
  <br>
  <sub><strong>Status Badges</strong>: leitura rápida do estado dos workflows diretamente no README.</sub>
</p>

[⬆️ Retornar ao índice](#indice)

---

<a id="evidencias-tecnicas"></a>

## Evidências técnicas

Esta seção reúne as principais evidências que comprovam a execução e o propósito técnico do laboratório.

| Evidência | Arquivo | O que comprova |
| --- | --- | --- |
| Frontend Overview | `docs/images/frontend-overview.png` | Interface funcional para leitura operacional |
| Quality Checks | `docs/images/frontend-quality-checks.png` | Visualização das validações de qualidade |
| Health Status | `docs/images/frontend-health-status.png` | Monitoramento visual da API e do banco |
| PostgreSQL Service Container | `docs/images/actions-postgres-service-container.png` | Testes de integração com banco real no GitHub Actions |
| Debug Logs | `docs/images/actions-debug-logs.png` | Logs agrupados e leitura organizada do pipeline |
| Artifacts | `docs/images/actions-artifacts.png` | Geração de evidências exportáveis pelo workflow |
| Docker Action Demo | `docs/images/actions-docker-action-demo.png` | Uso de container como action local |
| Status Badge | `docs/images/status-badge.png` | Estado dos workflows visível no README |

Essas evidências conectam código, execução, documentação e resultado visual, facilitando a leitura do projeto por avaliadores técnicos e recrutadores.

Checklist complementar:

- [docs/evidence.md](docs/evidence.md)

[⬆️ Retornar ao índice](#indice)

---

<a id="troubleshooting"></a>

## Troubleshooting

A documentação de troubleshooting foi organizada para apoiar problemas comuns de execução local e automação.

Cenários documentados:

- porta `5432` ocupada;
- falha de conexão com PostgreSQL;
- incompatibilidade de versão do Node.js;
- problemas com `.venv` no WSL2 e VSCode;
- erro de caminho ou permissão em Docker Action local;
- validações locais antes do push.

Guias disponíveis:

- [docs/troubleshooting/postgres.md](docs/troubleshooting/postgres.md)
- [docs/troubleshooting/python-venv.md](docs/troubleshooting/python-venv.md)
- [docs/troubleshooting/docker-action.md](docs/troubleshooting/docker-action.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)

[⬆️ Retornar ao índice](#indice)

---

<a id="principais-habilidades-demonstradas"></a>

## Principais habilidades demonstradas

Este laboratório evidencia competências importantes para posições de Engenharia de Dados, DevOps, Cloud e CI/CD.

Competências técnicas demonstradas:

- criação de API com FastAPI;
- modelagem simples de dados em PostgreSQL;
- uso de SQL direto com Python;
- execução local com Docker Compose;
- automação com Makefile;
- testes unitários e integração com Pytest;
- configuração de GitHub Actions;
- uso de PostgreSQL como service container;
- execução de job em container Ubuntu 22.04;
- geração de logs estruturados;
- publicação de artifacts;
- criação de Docker Action local;
- documentação técnica com evidências visuais;
- troubleshooting orientado a execução.

[⬆️ Retornar ao índice](#indice)

---

<a id="proximos-passos"></a>

## Próximos passos

Possíveis evoluções para ampliar o valor técnico do projeto:

1. adicionar autenticação simples para rotas administrativas;
2. incluir mais cenários de qualidade de dados;
3. gerar relatórios em JSON ou Markdown como artifacts;
4. adicionar testes end-to-end no frontend;
5. incluir análise de cobertura de testes;
6. publicar uma versão demonstrativa da interface;
7. criar uma release documentando a primeira versão estável do laboratório.

[⬆️ Retornar ao índice](#indice)

---

<a id="autor"></a>

## Autor

**Luiz André de Souza**

- GitHub: https://github.com/brodyandre
- LinkedIn: https://www.linkedin.com/in/luiz-andre-souza-data-engineer/

[⬆️ Retornar ao índice](#indice)

