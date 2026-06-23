#!/usr/bin/env bash
set -euo pipefail

required_dirs=(
  ".github/workflows"
  "backend/app"
  "backend/tests/unit"
  "backend/tests/integration"
  "frontend/src/components"
  "frontend/src/pages"
  "frontend/src/services"
  "database/migrations"
  "database/seeds"
  "docs/images"
  "docs/evidence"
  "docs/troubleshooting"
  "scripts"
  "action"
  ".vscode"
)

required_files=(
  "README.md"
  ".env.example"
  "docker-compose.yml"
  "Makefile"
  "backend/requirements.txt"
  "backend/app/main.py"
  "backend/app/database.py"
  "frontend/package.json"
  "frontend/index.html"
  "frontend/src/App.jsx"
  "docs/architecture.md"
  "docs/evidence.md"
  "docs/github-actions-debug-logs.md"
  "docs/service-containers.md"
  ".vscode/settings.json"
)

required_workflows=(
  ".github/workflows/ci.yml"
  ".github/workflows/integration-postgres.yml"
  ".github/workflows/debug-logs.yml"
  ".github/workflows/docker-action-demo.yml"
)

required_migrations=(
  "database/migrations/001_create_tables.sql"
)

echo "Validando diretorios principais..."
for dir in "${required_dirs[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "Diretorio ausente: $dir"
    exit 1
  fi
done

echo "Validando arquivos essenciais..."
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Arquivo ausente: $file"
    exit 1
  fi
done

echo "Validando workflows..."
for workflow in "${required_workflows[@]}"; do
  if [ ! -f "$workflow" ]; then
    echo "Workflow ausente: $workflow"
    exit 1
  fi
done

echo "Validando migrations..."
for migration in "${required_migrations[@]}"; do
  if [ ! -f "$migration" ]; then
    echo "Migration ausente: $migration"
    exit 1
  fi
done

echo "Estrutura do projeto validada com sucesso."
