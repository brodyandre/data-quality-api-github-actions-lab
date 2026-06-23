# Troubleshooting

## Objetivo

Servir como índice inicial para problemas conhecidos, causas prováveis e ações corretivas do laboratório.

## Problemas que provavelmente aparecerão

| Sintoma | Possível causa | Ação inicial |
| --- | --- | --- |
| PostgreSQL não responde | container ainda não ficou pronto | revisar healthcheck e logs |
| Job falha sem contexto | logs insuficientes | habilitar debug e artifact |
| Testes de integração quebram | variáveis de ambiente inconsistentes | validar `.env` e workflow |
| Badge não atualiza | workflow ainda não existe ou falhou | revisar nome do arquivo e status |

## Guias detalhados

- [PostgreSQL local](troubleshooting/postgres.md)
- [Python com .venv no VSCode](troubleshooting/python-venv.md)

## Organização

- use `docs/troubleshooting/` para casos detalhados
- mantenha este arquivo como ponto de entrada rápido
