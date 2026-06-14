#!/usr/bin/env bash
set -euo pipefail

# Build on Mac (or CI), then upload .next to FastComet when server build fails.
# Usage:
#   ./scripts/deploy-build-artifact.sh
#   scp aigateway-build.tar.gz user@server:/home/oxydatam/aigateway/
#   ssh user@server "cd /home/oxydatam/aigateway && tar -xzf aigateway-build.tar.gz && rm aigateway-build.tar.gz"

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Building locally..."
pkill -f "next dev" 2>/dev/null || true
sleep 1

npm run build:local

# Package immediately — Next.js may delete transient folders (diagnostics)
# and a running dev server can overwrite .next/server.
echo "Packaging .next artifact (Linux-compatible, no macOS xattrs)..."
COPYFILE_DISABLE=1 tar --no-xattrs -czf aigateway-build.tar.gz .next

echo "Done: $ROOT/aigateway-build.tar.gz"
echo "Upload to FastComet, then run:"
echo "  cd /home/oxydatam/aigateway"
echo "  tar -xzf aigateway-build.tar.gz"
echo "  rm aigateway-build.tar.gz"
echo "Restart the Node.js app from cPanel."
