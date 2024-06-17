#!/usr/bin/env bash

# Set error handling and debug
set -eux

# Runs command as regular user
exec "$@"
