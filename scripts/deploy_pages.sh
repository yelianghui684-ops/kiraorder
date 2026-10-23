#!/usr/bin/env bash
# Build the frontend and publish dist/ to the gh-pages branch that GitHub Pages serves.
#
# The published site lives at https://<owner>.github.io/kiraorder/ because
# vite.config.ts sets base: "/kiraorder/". Update that base value if the
# repository (and therefore the URL path) is ever renamed.
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL="$(git remote get-url origin)"
AUTHOR_NAME="$(git config user.name || echo "kiraorder")"
AUTHOR_EMAIL="$(git config user.email || echo "kiraorder@users.noreply.github.com")"

npm run build

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
cp -R dist/. "$STAGE/"
# Skip Jekyll so files are published exactly as built.
touch "$STAGE/.nojekyll"

(
  cd "$STAGE"
  git init -q -b gh-pages
  git add -A
  git -c user.name="$AUTHOR_NAME" -c user.email="$AUTHOR_EMAIL" \
    commit -q -m "Deploy KiraOrder build $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push --force "$REMOTE_URL" gh-pages
)

echo "Published. GitHub Pages usually picks it up in under a minute."
