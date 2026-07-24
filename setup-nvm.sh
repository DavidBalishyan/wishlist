#!/usr/bin/env bash

set -euo pipefail

# NODE_VERSION="${1:-}"
NODE_VERSION=24

if [ -z "$NODE_VERSION" ]; then
  echo "Usage: $0 <node-version>"
  echo "Example: $0 24"
  exit 1
fi

export NVM_DIR="$HOME/.nvm"

# Install nvm if not present
if [ ! -d "$NVM_DIR" ]; then
  echo "Installing nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
fi

# Load nvm
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

if ! command -v nvm &>/dev/null; then
  echo "Error: nvm failed to load. Restart your shell and try again."ո
  exit 1
fi

echo "Installing Node.js v${NODE_VERSION}..."
nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"
nvm alias default "$NODE_VERSION"

echo "Done. Node $(node -v) is now the default."
