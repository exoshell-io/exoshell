#!/usr/bin/env bash

# Set error handling and debug
set -eux

# Set UID same as host
OLD_USERNAME="$(getent passwd ${UID} | cut -d: -f1)"
# If the user with the specified UID exists, modify it
if [ -n "${OLD_USERNAME}" ]; then
  usermod -l ${USERNAME} ${OLD_USERNAME}
  usermod -d /home/${USERNAME} -m ${USERNAME}
else
  # Create a new user with the specified UID
  useradd -u ${UID} -m -s /bin/bash ${USERNAME}
fi

# Set GID same as host
OLD_GROUPNAME="$(getent group ${GID} | cut -d: -f1)"
# If the group with the specified GID exists, modify it
if [ -n "${OLD_GROUPNAME}" ]; then
  groupmod -n ${GROUPNAME} ${OLD_GROUPNAME}
else
  # Create a new group with the specified GID
  groupadd -g ${GID} ${GROUPNAME}
fi

# Ensure the user is in the correct group
usermod -g ${GROUPNAME} ${USERNAME}

# Check if the home directory exists, and create it if it doesn't
if [ ! -d /home/${USERNAME} ]; then
  mkdir -p /home/${USERNAME}
  chown ${USERNAME}:${GROUPNAME} /home/${USERNAME}
fi

# Change ownership of the home directory
chown -R ${USERNAME}:${GROUPNAME} /home/${USERNAME}

# Set user shells
echo "export MISE_DATA_DIR=/home/${USERNAME}/.local/share/mise" | tee -a /home/${USERNAME}/.bashrc
echo "export MISE_TRUSTED_CONFIG_PATHS=/exoshell/.mise.toml" | tee -a /home/${USERNAME}/.bashrc
echo "export PATH=/home/${USERNAME}/.local/share/mise/shims:${PATH}" | tee -a /home/${USERNAME}/.bashrc
echo 'eval "$(mise activate bash)"' | tee -a /home/${USERNAME}/.bashrc

echo "export MISE_DATA_DIR=/home/${USERNAME}/.local/share/mise" | tee -a /home/${USERNAME}/.profile
echo "export MISE_TRUSTED_CONFIG_PATHS=/exoshell/.mise.toml" | tee -a /home/${USERNAME}/.profile
echo "export PATH=/home/${USERNAME}/.local/share/mise/shims:${PATH}" | tee -a /home/${USERNAME}/.profile
echo 'eval "$(mise activate bash)"' | tee -a /home/${USERNAME}/.profile

# Setup install shell
export MISE_DATA_DIR=/home/${USERNAME}/.local/share/mise

# Setup dependencies as runtime user
su ${USERNAME} -c "mise trust"
su ${USERNAME} -c "mise install -y"
su ${USERNAME} -c "mise exec -- rustup default stable"
su ${USERNAME} -c "mise exec -- bun install"

# Runs command as regular user
exec gosu ${USERNAME} "$@"
