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

## Narrativa sugerida para portfólio

- contexto: demonstrar observabilidade prática em GitHub Actions
- ação: organizar logs com groups e annotations sem criar falhas reais
- evidência: exportar `debug-report.txt` como artifact
- resultado: facilitar leitura, troubleshooting e apresentação técnica
