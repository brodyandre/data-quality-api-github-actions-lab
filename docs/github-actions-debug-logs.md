# GitHub Actions: Debug e Logs

## Objetivo

Documentar como o laboratório vai explorar diagnóstico de pipelines com foco em clareza, rastreabilidade e portfólio técnico.

## Pontos de atenção

- habilitar logs detalhados quando necessário
- registrar falhas com contexto suficiente para reprodução
- organizar artifacts e job summaries
- diferenciar erro de aplicação, erro de ambiente e erro de pipeline

## Itens previstos para a próxima fase

- uso de `ACTIONS_RUNNER_DEBUG`
- uso de `ACTIONS_STEP_DEBUG`
- upload de logs como artifact
- resumo de execução em job summary
- prints das falhas e das correções em `docs/images/`

## Evidências esperadas

| Evidência | Destino |
| --- | --- |
| print de job com erro | `docs/images/` |
| print do job corrigido | `docs/images/` |
| logs exportados | `docs/evidence/` |
| anotações de incidentes | `docs/troubleshooting/` |
