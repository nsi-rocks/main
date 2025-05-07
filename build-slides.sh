#!/usr/bin/env bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

cd "$(dirname "$0")/slides" || exit 1

for FILE in ./*.md; do
  YAML=$(awk '/^---/{f=!f; next} f' "$FILE")

  BASE=$(echo "$YAML" | awk -F': ' '/^base:/ {print $2}')
  OUT=$(echo "$YAML" | awk -F': ' '/^out:/ {print $2}')

  if [[ -n "$BASE" && -n "$OUT" ]]; then
    echo -e "${GREEN} Building ${RESET} $FILE"
    echo "   ➤ base: $BASE"
    echo "   ➤ out : $OUT"
    pnpm build "$FILE" --base "$BASE" --out "$OUT"
  else
    echo -e "${YELLOW} Skipping ${RESET} $FILE (missing base or out in frontmatter)"
  fi
done