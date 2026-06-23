# GitHub Actions: Debug e Logs

## Objetivo

Documentar como o laboratório explora diagnóstico de pipelines com foco em clareza, rastreabilidade e portfólio técnico.

## Workflow implementado

- arquivo: `.github/workflows/debug-logs.yml`
- gatilhos: `workflow_dispatch` e `push` na `main`
- artifact principal: `artifacts/debug-report.txt`
- foco: grouping, annotations, leitura de logs e exportação de evidências

## O que o workflow demonstra

- validação de ambiente do runner
- validação de dependências essenciais
- simulação de execução de testes
- geração de relatório final
- uso de `::group::` e `::endgroup::` para organizar blocos
- uso de `::notice::`, `::warning::` e `::error::` para annotations visuais
- upload de artifact para leitura posterior

## Sobre o debug avançado

O workflow foi mantido silencioso por padrão, mas o repositório já está preparado para ampliar a verbosidade quando necessário.

Você pode ativar debug avançado no GitHub Actions com:

- `ACTIONS_STEP_DEBUG=true`
- `ACTIONS_RUNNER_DEBUG=true`

Esses valores podem ser definidos como Variable ou Secret no repositório, dependendo da política que você preferir para governança e compartilhamento interno.

## Leitura profissional dos logs

Ao analisar a execução, a sequência recomendada é:

1. abrir os grupos de ambiente e dependências para validar contexto do runner
2. revisar notices para entender o fluxo saudável
3. verificar warnings para sinais fracos de instabilidade
4. inspecionar a annotation de error controlada apenas como exemplo visual
5. baixar o artifact `debug-logs-report` para preservar a evidência textual

## Evidências esperadas

| Evidência | Destino |
| --- | --- |
| print do agrupamento de logs | `docs/images/actions-debug-logs.png` |
| print da área de artifacts | `docs/images/actions-artifacts.png` |
| relatório exportado | `docs/evidence/` |
| anotações de incidentes | `docs/troubleshooting/` |
