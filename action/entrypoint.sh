#!/bin/sh
set -eu

report_path="${1:-}"

if [ -z "$report_path" ]; then
  echo "::error title=Input ausente::O input report-path e obrigatorio."
  exit 1
fi

case "$report_path" in
  /*)
    resolved_path="$report_path"
    ;;
  *)
    resolved_path="/github/workspace/$report_path"
    ;;
esac

if [ ! -f "$resolved_path" ]; then
  echo "::error title=Arquivo nao encontrado::O arquivo '$report_path' nao existe no workspace."
  exit 1
fi

line_count="$(wc -l < "$resolved_path" | tr -d ' ')"
word_count="$(wc -w < "$resolved_path" | tr -d ' ')"
byte_count="$(wc -c < "$resolved_path" | tr -d ' ')"
first_line="$(sed -n '1p' "$resolved_path")"

echo "::group::Resumo do relatorio"
echo "Arquivo lido: $report_path"
echo "Linhas: $line_count"
echo "Palavras: $word_count"
echo "Bytes: $byte_count"

if [ "$line_count" -eq 0 ]; then
  echo "::warning title=Relatorio vazio::O arquivo existe, mas nao possui conteudo."
else
  echo "Primeira linha: $first_line"
  echo "Preview:"
  sed -n '1,5p' "$resolved_path"
fi

echo "::endgroup::"
echo "::notice title=Resumo gerado::A Docker Action processou '$report_path' com sucesso."

if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
  {
    echo "## Docker Action Summary"
    echo ""
    echo "- Arquivo: \`$report_path\`"
    echo "- Linhas: $line_count"
    echo "- Palavras: $word_count"
    echo "- Bytes: $byte_count"
  } >> "$GITHUB_STEP_SUMMARY"
fi
