ARG DEVCONTAINER_BASE_DOCKER_IMAGE
FROM ${DEVCONTAINER_BASE_DOCKER_IMAGE}

# Secure shell
SHELL [ "/bin/bash", "--norc", "--noprofile", "-euxo", "pipefail", "-O", "nullglob", "-c" ]

# User root for setup
USER root

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
  apt-get -y --no-install-recommends install vim gh curl git build-essential pkg-config libssl-dev clang libgtk-3-dev libayatana-appindicator3-dev libwebkit2gtk-4.0-dev librsvg2-dev mise gosu && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Fetch env variables
ARG USERNAME
ARG UID
ARG GROUPNAME
ARG GID

# Set UID same as host if necessary
RUN CURRENT_UID=$(id -u) \
  && if [ "${CURRENT_UID}" != "${UID}" ]; then \
  OLD_USERNAME="$(getent passwd ${UID} | cut -d: -f1)" \
  && if [ -n "${OLD_USERNAME}" ]; then \
  usermod -l ${USERNAME} ${OLD_USERNAME} \
  && usermod -d /home/${USERNAME} -m ${USERNAME}; \
  else \
  useradd -u ${UID} -m -s /bin/bash ${USERNAME}; \
  fi; \
  fi

# Set GID same as host if necessary
RUN CURRENT_GID=$(id -g ) \
  && if [ "${CURRENT_GID}" != "${GID}" ]; then \
  OLD_GROUPNAME="$(getent group ${GID} | cut -d: -f1)" \
  && if [ -n "${OLD_GROUPNAME}" ]; then \
  groupmod -n ${GROUPNAME} ${OLD_GROUPNAME}; \
  else \
  groupadd -g ${GID} ${GROUPNAME}; \
  fi \
  && usermod -g ${GROUPNAME} ${USERNAME}; \
  fi

# Ensure the user is in the correct group and home directory exists
RUN if [ ! -d /home/${USERNAME} ]; then \
  mkdir -p /home/${USERNAME} \
  && chown ${USERNAME}:${GROUPNAME} /home/${USERNAME}; \
  fi \
  && chown -R ${USERNAME}:${GROUPNAME} /home/${USERNAME}

# Switch to user
USER ${USERNAME}

# Set workdir
WORKDIR /exoshell

# Set user shells in .bashrc
RUN echo "export MISE_DATA_DIR=/home/${USERNAME}/.local/share/mise" | tee -a /home/${USERNAME}/.bashrc \
  && echo "export MISE_TRUSTED_CONFIG_PATHS=/exoshell/.mise.toml" | tee -a /home/${USERNAME}/.bashrc \
  && echo "export PATH=/home/${USERNAME}/.local/share/mise/shims:${PATH}" | tee -a /home/${USERNAME}/.bashrc \
  && echo 'eval "$(mise activate bash)"' | tee -a /home/${USERNAME}/.bashrc

# Set user shells in .profile
RUN echo "export MISE_DATA_DIR=/home/${USERNAME}/.local/share/mise" | tee -a /home/${USERNAME}/.profile \
  && echo "export MISE_TRUSTED_CONFIG_PATHS=/exoshell/.mise.toml" | tee -a /home/${USERNAME}/.profile \
  && echo "export PATH=/home/${USERNAME}/.local/share/mise/shims:${PATH}" | tee -a /home/${USERNAME}/.profile \
  && echo 'eval "$(mise activate bash)"' | tee -a /home/${USERNAME}/.profile

# Setup dependencies
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY .mise.toml .mise.toml
RUN mise trust
# Add 2 .env dummy files to stop 'mise' error
RUN touch .env .env.local
RUN mise install -y
RUN mise exec -- rustup default stable
RUN mise exec -- bun install

# Entrypoint script
ENTRYPOINT [".devcontainer/entrypoint.sh"]

# Command to execute
CMD ["sleep", "inf"]
