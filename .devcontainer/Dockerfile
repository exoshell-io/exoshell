ARG DEVCONTAINER_BASE_DOCKER_IMAGE
FROM ${DEVCONTAINER_BASE_DOCKER_IMAGE}

# Secure shell
SHELL [ "/bin/bash", "--norc", "--noprofile", "-euxo", "pipefail", "-O", "nullglob", "-c" ]

# User root for setup
USER root

# Set workdir
WORKDIR /exoshell

# Setup system
RUN set -eux
RUN apt-get update && \
  apt-get install -y --no-install-recommends wget gpg ca-certificates
RUN install -dm 755 /etc/apt/keyrings
RUN echo "deb http://gb.archive.ubuntu.com/ubuntu jammy main" | tee /etc/apt/sources.list.d/jammy.list && \
  wget -qO - 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x871920D1991BC93C' | gpg --dearmor | tee /etc/apt/trusted.gpg.d/ubuntu-jammy-archive.gpg > /dev/null && \
  chmod a+r /etc/apt/trusted.gpg.d/ubuntu-jammy-archive.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" | tee /etc/apt/sources.list.d/mise.list && \
  wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor | tee /etc/apt/keyrings/mise-archive-keyring.gpg 1> /dev/null && \
  chmod a+r /etc/apt/keyrings/mise-archive-keyring.gpg
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get dist-upgrade && \
  apt-get -y --no-install-recommends vim gh install curl git build-essential pkg-config libssl-dev clang libgtk-3-dev libayatana-appindicator3-dev libwebkit2gtk-4.0-dev librsvg2-dev mise gosu && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Entrypoint script
ENTRYPOINT [".devcontainer/entrypoint.sh"]

# Command to execute
CMD ["sleep", "inf"]
