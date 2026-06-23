#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Iniciando validacao final local..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Arquivo .env criado automaticamente a partir de .env.example."
fi

if [ ! -x .venv/bin/pytest ]; then
  echo "Ambiente Python nao encontrado. Executando setup-backend..."
  make setup-backend
fi

if [ ! -d frontend/node_modules ]; then
  echo "Dependencias do frontend nao encontradas. Executando setup-frontend..."
  make setup-frontend
fi

echo "Subindo banco local..."
make up

echo "Aplicando migrations..."
make migrate

echo "Carregando seed..."
make seed

echo "Executando checks finais..."
make check

echo "Validacao final local concluida com sucesso."
