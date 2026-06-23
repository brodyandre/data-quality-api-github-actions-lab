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

- registrar antes e depois das correções
- nomear arquivos de forma consistente
- destacar o contexto técnico de cada evidência
- manter a narrativa focada em problema, diagnóstico e resultado

## Evidências recomendadas para o workflow de debug

| Evidência | Arquivo sugerido |
| --- | --- |
| visão geral dos grupos de log | `docs/images/actions-debug-logs.png` |
| tela de artifacts do workflow | `docs/images/actions-artifacts.png` |
| relatório baixado do Actions | `docs/evidence/debug-report.txt` |
| captura da annotation de warning/error | `docs/images/actions-debug-logs.png` |

## Evidências recomendadas para a Docker Action

| Evidência | Arquivo sugerido |
| --- | --- |
| execução da etapa `Executar Docker Action local` | `docs/images/actions-docker-action-demo.png` |
| conteúdo do artifact de exemplo | `docs/evidence/sample-report.txt` |
| log com resumo de linhas, palavras e bytes | `docs/images/actions-docker-action-demo.png` |

## Narrativa sugerida para portfólio

- contexto: demonstrar observabilidade prática em GitHub Actions
- ação: organizar logs com groups e annotations sem criar falhas reais
- evidência: exportar `debug-report.txt` como artifact
- resultado: facilitar leitura, troubleshooting e apresentação técnica

## Narrativa sugerida para container como action

- contexto: demonstrar reuso de automação empacotada como Docker Action local
- ação: gerar um relatório simples no workflow e processá-lo com `uses: ./action`
- evidência: publicar `sample-report.txt` e capturar o resumo exibido no log
- resultado: mostrar domínio de Actions além de jobs tradicionais e service containers
