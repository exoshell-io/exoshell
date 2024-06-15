#!/usr/bin/env bash

# Set error handling and debug
set -eux

# Combine .env and .env.local, filter out comments and empty lines, sort by variable name,
# remove duplicates, and append environment variables with host information.
(cat .env .env.local | \
 grep -v '^#' | \
 grep -v '^$' | \
 sort -t '=' -k 1,1 | \
 awk -F '=' '!seen[$1]++' && \
 echo "DEVCONTAINER_HOST_USERNAME=$(id -un)" && \
 echo "DEVCONTAINER_HOST_UID=$(id -u)" && \
 echo "DEVCONTAINER_HOST_GROUPNAME=$(id -gn)" && \
 echo "DEVCONTAINER_HOST_GID=$(id -g)") > .devcontainer/.env
