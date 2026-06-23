# Service Containers

## Objetivo

Preparar o laboratório para demonstrar o uso de PostgreSQL como service container no GitHub Actions, mantendo paridade básica com o ambiente local via Docker Compose.

## Estratégia inicial

- desenvolvimento local com `docker-compose.yml`
- testes de pipeline com PostgreSQL como service container
- backend consumindo configurações por variáveis de ambiente
- foco em logs de inicialização, healthcheck e conectividade

## Cenário alvo

1. O job executa em ambiente Ubuntu 22.04.
2. O PostgreSQL sobe como service container.
3. Os testes validam conectividade e comportamento básico da API.

## Ganhos para portfólio

- demonstra domínio de CI/CD com banco em pipeline
- mostra capacidade de diagnosticar problemas de rede e readiness
- produz evidências visuais e textuais reaproveitáveis em apresentações técnicas
