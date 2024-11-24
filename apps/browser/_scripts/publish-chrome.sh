#!/bin/bash
set -euo pipefail
shopt -s nullglob

chrome-webstore-upload upload \
  --source .output/exoshell-"${npm_package_version:?}"-chrome.zip \
  --extension-id "${CHROME_EXTENSION_ID:?}" \
  --client-id "${CHROME_CLIENT_ID:?}" \
  --client-secret "${CHROME_CLIENT_SECRET:?}" \
  --refresh-token "${CHROME_REFRESH_TOKEN:?}"
