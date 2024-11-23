#!/bin/bash
set -euo pipefail
shopt -s nullglob

wxt submit \
  --firefox-zip .output/exoshell-"${npm_package_version:?}"-firefox.zip \
  --firefox-sources-zip .output/exoshell-"${npm_package_version}"-sources.zip
