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
  apt-get dist-upgrade -y && \
  apt-get install -y --no-install-recommends vim gh curl git build-essential pkg-config libssl-dev clang libgtk-3-dev libayatana-appindicator3-dev libwebkit2gtk-4.0-dev librsvg2-dev mise gosu && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Fetch env variables
ARG DEVCONTAINER_HOST_USERNAME
ARG DEVCONTAINER_HOST_UID
ARG DEVCONTAINER_HOST_GROUPNAME
ARG DEVCONTAINER_HOST_GID

# Set UID same as host if necessary
RUN CURRENT_UID=$(id -u) \
  && if [ "${CURRENT_UID}" != "${DEVCONTAINER_HOST_UID}" ]; then \
  OLD_USERNAME="$(getent passwd ${DEVCONTAINER_HOST_UID} | cut -d: -f1)" \
  && if [ -n "${OLD_USERNAME}" ]; then \
  usermod -l ${DEVCONTAINER_HOST_USERNAME} ${OLD_USERNAME} \
  && usermod -d /home/${DEVCONTAINER_HOST_USERNAME} -m ${DEVCONTAINER_HOST_USERNAME}; \
  else \
  useradd -u ${DEVCONTAINER_HOST_UID} -m -s /bin/bash ${DEVCONTAINER_HOST_USERNAME}; \
  fi; \
  fi

# Set GID same as host if necessary
RUN CURRENT_GID=$(id -g) \
  && if [ "${CURRENT_GID}" != "${DEVCONTAINER_HOST_GID}" ]; then \
  OLD_GROUPNAME="$(getent group ${DEVCONTAINER_HOST_GID} | cut -d: -f1)" \
  && if [ -n "${OLD_GROUPNAME}" ]; then \
  groupmod -n ${DEVCONTAINER_HOST_GROUPNAME} ${OLD_GROUPNAME}; \
  else \
  groupadd -g ${DEVCONTAINER_HOST_GID} ${DEVCONTAINER_HOST_GROUPNAME}; \
  fi \
  && usermod -g ${DEVCONTAINER_HOST_GROUPNAME} ${DEVCONTAINER_HOST_USERNAME}; \
  fi

# Ensure the user is in the correct group and home directory exists
RUN CURRENT_UID=$(id -u) && \
  CURRENT_GID=$(id -g) && \
  if [ "${CURRENT_UID}" != "${DEVCONTAINER_HOST_UID}" ] || [ "${CURRENT_GID}" != "${DEVCONTAINER_HOST_GID}" ]; then \
  if [ ! -d $(eval echo ~${DEVCONTAINER_HOST_USERNAME}) ]; then \
  mkdir -p $(eval echo ~${DEVCONTAINER_HOST_USERNAME}) && \
  chown ${DEVCONTAINER_HOST_USERNAME}:${DEVCONTAINER_HOST_GROUPNAME} $(eval echo ~${DEVCONTAINER_HOST_USERNAME}); \
  fi && \
  chown -R ${DEVCONTAINER_HOST_USERNAME}:${DEVCONTAINER_HOST_GROUPNAME} $(eval echo ~${DEVCONTAINER_HOST_USERNAME}); \
  fi

# Switch to user
USER ${DEVCONTAINER_HOST_USERNAME}

# Set workdir
WORKDIR /workspaces/exoshell

# Set user shells in .bashrc
RUN echo "export MISE_DATA_DIR=${HOME}/.local/share/mise" | tee -a ${HOME}/.bashrc \
  && echo "export MISE_TRUSTED_CONFIG_PATHS=/workspaces/exoshell/.mise.toml" | tee -a ${HOME}/.bashrc \
  && echo "export PATH=${HOME}/.local/share/mise/shims:${PATH}" | tee -a ${HOME}/.bashrc \
  && echo 'eval "$(mise activate bash)"' | tee -a ${HOME}/.bashrc

# Set user shells in .profile
RUN echo "export MISE_DATA_DIR=${HOME}/.local/share/mise" | tee -a ${HOME}/.profile \
  && echo "export MISE_TRUSTED_CONFIG_PATHS=/workspaces/exoshell/.mise.toml" | tee -a ${HOME}/.profile \
  && echo "export PATH=${HOME}/.local/share/mise/shims:${PATH}" | tee -a ${HOME}/.profile \
  && echo 'eval "$(mise activate bash)"' | tee -a ${HOME}/.profile

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
