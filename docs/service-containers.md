# Service Containers

## Objetivo

Demonstrar o uso de PostgreSQL como service container no GitHub Actions com testes de integração reais, mantendo uma experiência simples e próxima do ambiente local via Docker Compose.

## O que foi implementado

- workflow `.github/workflows/integration-postgres.yml`
- job executando em `ubuntu-latest` com `container: ubuntu:22.04`
- service container `postgres:16` com `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD`
- healthcheck com `pg_isready`
- instalação de `python3`, `python3-venv`, `python3-pip`, `postgresql-client` e `curl` dentro do container do job
- execução de migrations, seed e testes de integração
- geração de artifact com relatório simples em `artifacts/integration-report.txt`

## Fluxo no GitHub Actions

1. O runner do GitHub Actions inicia o job em `ubuntu-latest`.
2. O job é executado dentro de um container `ubuntu:22.04`.
3. O PostgreSQL sobe em paralelo como service container `postgres:16`.
4. O job instala dependências do sistema e do backend.
5. O pipeline aguarda o banco ficar saudável com `pg_isready`.
6. As migrations e seeds preparam a base.
7. Os testes de integração validam API, consultas e conectividade real.
8. O relatório da execução sobe como artifact para evidência técnica.

## Local x GitHub Actions

No ambiente local, usamos `docker-compose.yml` para subir o PostgreSQL e acessamos o banco normalmente por `localhost` ou pela porta configurada no `.env`.

No GitHub Actions, o fluxo muda um pouco:

- o banco não roda em `localhost`
- o job principal roda em um container isolado
- o PostgreSQL entra como service container na mesma rede interna do job
- a conexão passa a usar `postgres` como hostname

Essa diferença é importante porque o laboratório mostra exatamente como adaptar a aplicação para dois contextos sem mudar o código da API, apenas trocando `DATABASE_URL`.

## Por que o hostname é `postgres`

Dentro de jobs com `container`, o GitHub Actions conecta o container principal e os service containers em uma rede interna dedicada. Nessa rede, cada service container fica acessível pelo nome definido em `services`.

Como o serviço foi declarado assim:

```yaml
services:
  postgres:
```

o backend e os testes devem acessar o banco por:

```text
postgresql://app_user:app_password@postgres:5432/data_quality_db
```

Em outras palavras:

- `localhost` dentro do job container aponta para o próprio container do job
- `postgres` aponta para o service container do PostgreSQL

## Ganhos para portfólio

- demonstra domínio de CI/CD com banco real dentro do pipeline
- mostra entendimento de redes entre job container e service container
- produz artefatos simples e rastreáveis para debugging
- cria uma base excelente para prints futuros em `docs/images/actions-postgres-service-container.png`
