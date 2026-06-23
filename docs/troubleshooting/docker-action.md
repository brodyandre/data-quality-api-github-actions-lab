# Troubleshooting: Docker Action

## Erro: arquivo de relatorio nao encontrado

Se a action falhar com mensagem dizendo que o arquivo nao existe, confira:

- se o passo que gera `artifacts/sample-report.txt` executou com sucesso
- se o `report-path` enviado para a action corresponde ao caminho real
- se o arquivo foi criado dentro do workspace do repositório

Exemplo correto:

```yaml
with:
  report-path: artifacts/sample-report.txt
```

## Erro: caminho relativo incorreto

Na Docker Action local, caminhos relativos sao resolvidos a partir de `/github/workspace`, que representa o checkout do repositório dentro do runner.

Se o arquivo estiver em outro diretório, ajuste o input para o caminho relativo completo.

## Erro: falha no build da action

Se o GitHub Actions falhar ao construir a action:

- valide se `action/action.yml` aponta para `Dockerfile`
- confirme se `action/Dockerfile` copia `entrypoint.sh`
- revise erros de sintaxe em `action/entrypoint.sh`

Validacao local simples:

```bash
sh -n action/entrypoint.sh
```

## Como inspecionar os logs

Ao abrir o job `Docker Action Demo`, revise esta ordem:

1. etapa de geracao do relatorio
2. bloco agrupado com o conteudo do arquivo
3. etapa `Executar Docker Action local`
4. notice final da action com o resumo processado

## Como validar o artifact

Depois da execucao:

1. abra a area de `Artifacts` do workflow
2. baixe `docker-action-sample-report`
3. confirme se `sample-report.txt` corresponde ao arquivo lido pela action
