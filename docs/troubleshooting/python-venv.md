# Python com .venv no VSCode

## Objetivo

Centralizar os problemas mais comuns de ambiente Python local no WSL2 com VSCode.

## Criar o ambiente virtual

Se a `.venv` ainda não existir:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt
```

Se preferir os atalhos do projeto:

```bash
make venv
make install-backend
```

## VSCode não encontra o interpretador

Se o VSCode não detectar a `.venv` automaticamente:

1. abra `Python: Select Interpreter`
2. selecione `${workspaceFolder}/.venv/bin/python`
3. recarregue a janela se necessário

O repositório já aponta para esse caminho em `.vscode/settings.json`.

## `pytest` não encontrado

Isso normalmente significa que:

- a `.venv` não foi ativada
- as dependências não foram instaladas
- o VSCode está usando outro interpretador

Valide com:

```bash
source .venv/bin/activate
python --version
pip --version
pytest --version
```

Se necessário:

```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

## `ModuleNotFoundError` ao rodar o backend

Confira se você está usando a `.venv` correta ou os alvos do projeto.

Fluxos recomendados:

```bash
make run-api
make test-backend
```

ou

```bash
source .venv/bin/activate
PYTHONPATH=backend uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Quando recriar a `.venv`

Vale recriar o ambiente quando:

- o Python do WSL mudou de versão
- a instalação de dependências ficou inconsistente
- o VSCode continua resolvendo pacotes errados

Fluxo seguro:

```bash
rm -rf .venv
make setup-backend
```

## Validação final

```bash
make setup-backend
make test-backend
```
