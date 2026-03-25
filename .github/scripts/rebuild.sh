#!/usr/bin/env bash
set -euo pipefail

# Rebuild script for keploy/docs
# Runs on existing source tree (no clone). Installs deps, runs pre-build steps, builds.

# --- Node version ---
NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "[ERROR] Node $NODE_MAJOR detected, but keploy/docs requires Node >=18."
    echo "        Install Node 18+ and re-run."
    exit 1
fi
echo "[INFO] Using $(node --version)"

# --- Install dependencies ---
export HUSKY=0
yarn install --frozen-lockfile 2>/dev/null || yarn install

# --- Build ---
yarn build

echo "[DONE] Build complete."
