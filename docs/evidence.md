# Evidências do Laboratório

## Objetivo

Centralizar a estratégia de evidências para que cada evolução do projeto gere material útil para portfólio, estudo de caso e demonstração técnica.

## Estrutura prevista

| Tipo de evidência | Local |
| --- | --- |
| prints de pipeline | `docs/images/` |
| logs exportados | `docs/evidence/` |
| incidentes detalhados | `docs/troubleshooting/` |
| arquitetura e decisões | `docs/` |

## Boas práticas

- registrar contexto, problema e resultado
- nomear arquivos com padrão consistente
- preferir capturas legíveis, com foco no ponto técnico
- manter alinhamento entre README, evidência e troubleshooting

## Checklist de prints a capturar

### GitHub Actions

- [ ] `docs/images/actions-postgres-service-container.png` com job em `ubuntu:22.04` e service container PostgreSQL
- [ ] `docs/images/actions-debug-logs.png` com groups expandidos e annotations visíveis
- [ ] `docs/images/actions-artifacts.png` com artifacts disponíveis para download
- [ ] `docs/images/actions-docker-action-demo.png` com a etapa `Executar Docker Action local`
- [ ] `docs/images/status-badge.png` com badges reais após publicação no GitHub

### Frontend

- [ ] `docs/images/frontend-overview.png` com a visão geral carregada
- [ ] `docs/images/frontend-quality-checks.png` com a tabela de validações
- [ ] `docs/images/frontend-health-status.png` com o status da API e do banco

### Evidências textuais

- [ ] `docs/evidence/debug-report.txt` baixado do workflow `Debug Logs`
- [ ] `docs/evidence/sample-report.txt` publicado pelo workflow `Docker Action Demo`
- [ ] relatório simples do workflow de integração com PostgreSQL

## Evidências recomendadas por cenário

| Cenário | Evidência principal | Arquivo sugerido |
| --- | --- | --- |
| Integração com PostgreSQL | job com service container saudável | `docs/images/actions-postgres-service-container.png` |
| Debug e logs | groups, warning e artifact | `docs/images/actions-debug-logs.png` |
| Artifacts | área de download do workflow | `docs/images/actions-artifacts.png` |
| Docker Action | resumo gerado pela action local | `docs/images/actions-docker-action-demo.png` |
| Frontend | visão operacional da aplicação | `docs/images/frontend-overview.png` |

## Narrativa sugerida para portfólio

- contexto: laboratório de CI/CD observável com backend, frontend e PostgreSQL
- ação: estruturar workflows que mostrem CI, integração real, debug e Docker Action
- evidência: publicar prints, artifacts e relatórios versionados
- resultado: demonstrar domínio técnico com material verificável e bem documentado
