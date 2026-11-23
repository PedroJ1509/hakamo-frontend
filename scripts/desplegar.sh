#!/usr/bin/env bash
# Despliega la web (Next.js) en el servidor con un solo comando:
#
#   bash /var/www/hakamo/frontend/scripts/desplegar.sh
#
# Pasos: código de GitHub (main), instalación, compilación y reinicio con pm2.
# Si la compilación falla, la web sigue funcionando con la versión anterior.
set -euo pipefail

CARPETA=/var/www/hakamo/frontend
PROCESO=hakamo-frontend
PUERTO=3000

paso() { printf '\n\033[1;34m==> %s\033[0m\n' "$1"; }
falla() { printf '\n\033[1;31mERROR: %s\033[0m\n' "$1" >&2; exit 1; }

cd "$CARPETA"

paso "1/5 Código nuevo desde GitHub"
# package-lock.json cambia solo cuando alguien corre npm install aquí: se descarta.
git checkout -- package-lock.json 2>/dev/null || true
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  git status --short
  falla "Hay archivos modificados en el servidor. Revísalos antes de desplegar."
fi
ANTES=$(git rev-parse --short HEAD)
git pull --ff-only origin main
DESPUES=$(git rev-parse --short HEAD)
echo "Versión: $ANTES -> $DESPUES"

paso "2/5 Comprobando que Strapi responde (la web lo lee al compilar)"
curl -fsS -o /dev/null http://localhost:1337/_health || falla "Strapi no responde. Despliega o reinicia el backend primero."

paso "3/5 Instalando dependencias"
npm ci --no-audit --no-fund

paso "4/5 Compilando"
npm run build

paso "5/5 Reiniciando la web"
pm2 restart "$PROCESO" --update-env
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null "http://localhost:$PUERTO/"; then
    printf '\n\033[1;32mLISTO: web desplegada (%s -> %s)\033[0m\n' "$ANTES" "$DESPUES"
    exit 0
  fi
  sleep 3
done
pm2 logs "$PROCESO" --lines 30 --nostream
falla "La web no respondió en 60 segundos. Revisa los registros de arriba."
