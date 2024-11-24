#!/bin/bash
set -euo pipefail
shopt -s nullglob

web-ext sign \
  --source-dir .output/firefox-mv3/ \
  --artifacts-dir .output/ \
  --api-key "${FIREFOX_API_KEY:?}" \
  --api-secret "${FIREFOX_API_SECRET:?}" \
  --channel "${FIREFOX_CHANNEL:?}"
