#!/usr/bin/env bash
# Build the static site and deploy it to the raylleung.github.io GitHub Pages repo.
# Usage: ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

REPO="https://github.com/raylleung/raylleung.github.io.git"

echo "▸ Building static export..."
npm run build

echo "▸ Preparing deploy repo..."
gh auth setup-git
TMP="$(mktemp -d)"
git clone --quiet "$REPO" "$TMP"

echo "▸ Syncing built site..."
find "$TMP" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R out/. "$TMP"/
printf '# raylleung.github.io\n\nRay Leung — portfolio. Built with Next.js (static export) and deployed to GitHub Pages.\n' > "$TMP/README.md"

cd "$TMP"
git add -A
if git diff --cached --quiet; then
  echo "▸ No changes to deploy."
  exit 0
fi
git -c user.name="neurawn" -c user.email="neurawn@users.noreply.github.com" \
    commit -q -m "Deploy site $(date -u +%Y-%m-%dT%H:%MZ)"
git push --quiet origin main
echo "✓ Deployed → https://raylleung.github.io/"
