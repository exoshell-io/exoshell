#!/usr/bin/env bash

# Set error handling and debug
set -eux

# Combine all .env files, filters out comments and empty lines,
# remove duplicates, and append environment variables with host information.
(cat .env* |
  grep -v '^#' |
  grep -v '^$' |
  awk -F '=' '!seen[$1]++' &&
  echo "DEVCONTAINER_HOST_USERNAME=$(id -un)" &&
  echo "DEVCONTAINER_HOST_UID=$(id -u)" &&
  echo "DEVCONTAINER_HOST_GROUPNAME=$(id -gn)" &&
  echo "DEVCONTAINER_HOST_GID=$(id -g)") >.devcontainer/.env
