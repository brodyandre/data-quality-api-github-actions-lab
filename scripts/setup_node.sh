#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NVMRC_FILE="$ROOT_DIR/.nvmrc"
INSTALL_MODE=0
COMMAND=()

while [[ $# -gt 0 ]]; do
  case "${1}" in
    --install)
      INSTALL_MODE=1
      shift
      ;;
    --)
      shift
      COMMAND=("$@")
      break
      ;;
    *)
      COMMAND=("$@")
      break
      ;;
  esac
done

required_node_version="$(tr -d '[:space:]' < "$NVMRC_FILE")"
required_node_major="${required_node_version%%.*}"

current_node_major() {
  if ! command -v node >/dev/null 2>&1; then
    return 1
  fi

  node -p "process.versions.node.split('.')[0]"
}

load_nvm() {
  local nvm_script
  local source_status

  nvm_script="${NVM_DIR:-$HOME/.nvm}/nvm.sh"

  if [[ -s "$nvm_script" ]]; then
    export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    set +e
    # shellcheck disable=SC1090
    source "$nvm_script"
    source_status=$?
    set -e

    if declare -F nvm >/dev/null 2>&1; then
      return 0
    fi

    return "$source_status"
  fi

  return 1
}

install_nvm() {
  local install_script
  install_script="$(mktemp)"

  echo "Instalando nvm em $HOME/.nvm..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh -o "$install_script"
  bash "$install_script"
  rm -f "$install_script"
}

ensure_node_version() {
  local active_major

  if active_major="$(current_node_major 2>/dev/null)"; then
    if [[ "$active_major" -ge "$required_node_major" ]]; then
      echo "Node atual v$(node -v | sed 's/^v//') já atende ao frontend."
      return 0
    fi
  fi

  if ! load_nvm; then
    if [[ "$INSTALL_MODE" -eq 1 ]]; then
      install_nvm
      load_nvm
    else
      echo "Node $(node -v 2>/dev/null || echo 'não encontrado') é incompatível com o frontend."
      echo "Rode 'make setup-node' para instalar/ativar Node $required_node_version automaticamente."
      return 1
    fi
  fi

  echo "Ativando Node $required_node_version via nvm..."

  if ! nvm use "$required_node_version" >/dev/null 2>&1; then
    echo "Node $required_node_version ainda não está disponível localmente. Instalando via nvm..."
    nvm install "$required_node_version"
    nvm use "$required_node_version" >/dev/null
  fi

  hash -r
  echo "Usando Node $(node -v) e npm $(npm -v)."
}

ensure_node_version

if [[ "${#COMMAND[@]}" -gt 0 ]]; then
  exec "${COMMAND[@]}"
fi
