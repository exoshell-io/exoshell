#!/usr/bin/env bash

# Set error handling and debug
set -eux

# Setup dependencies
mise install -y
mise exec -- bun install
