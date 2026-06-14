#!/usr/bin/env bash
set -euo pipefail

# Low-resource build profile for shared Linux hosting (e.g. FastComet).
export RAYON_NUM_THREADS=1
export UV_THREADPOOL_SIZE=1
export NEXT_WEBPACK_PARALLELISM=1
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=512}"
export NEXT_TELEMETRY_DISABLED=1

exec npx next build --webpack
