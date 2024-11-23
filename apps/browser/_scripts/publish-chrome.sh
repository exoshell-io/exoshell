#!/bin/bash
set -euo pipefail
shopt -s nullglob

wxt submit \
  --chrome-zip .output/exoshell-"${npm_package_version:?}"-chrome.zip
