#!/usr/bin/env bash
# Runs ON FastComet via: ssh user@host 'bash -s' < scripts/deploy-remote.sh
set -euo pipefail

REMOTE_APP="${REMOTE_APP:-/home/oxydatam/aigateway}"
REMOTE_TAR="${REMOTE_TAR:-/home/oxydatam/aigateway-build.tar.gz}"
GIT_BRANCH="${GIT_BRANCH:-main}"
NODE_VENV="${NODE_VENV:-/home/oxydatam/nodevenv/aigateway/22/bin/activate}"

if [[ ! -f "$REMOTE_TAR" ]]; then
  echo "ERROR: Tar not found: $REMOTE_TAR"
  echo "Run 'make upload' from your Mac first."
  exit 1
fi

# shellcheck source=/dev/null
source "$NODE_VENV"

cd "$REMOTE_APP"

echo "Syncing git..."
git fetch origin "$GIT_BRANCH"
git reset --hard "origin/$GIT_BRANCH"
git log -1 --oneline

echo "Extracting build..."
rm -rf .next
tar -xzf "$REMOTE_TAR"

echo "Verifying..."
ls .next/BUILD_ID .next/server .next/static

echo "Remote deploy OK."
