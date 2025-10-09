# Tránh chạy lại nếu đã từng chạy
if [ -f "$HOME/.installed" ]; then
    echo "Installing Robot Framework, Playwright and Extensions..."
    exec bash
    exit 0
fi


# Bash Cofig
cp /robot/.devcontainer/.bashrc "$HOME/.bashrc"

# Load NVM
echo "Loading NVM..."
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Cài đặt node
echo "Installing Node versions..."
# Giải nén Node.js các phiên bản
# mkdir -p ~/.nvm/versions/node/v18.20.8
# tar -xf /robot/.devcontainer/.nvm/node-v18.20.8-linux-x64.tar.xz -C ~/.nvm/versions/node/v18.20.8 --strip-components=1

# mkdir -p ~/.nvm/versions/node/v20.19.4
# tar -xf /robot/.devcontainer/.nvm/node-v20.19.4-linux-x64.tar.xz -C ~/.nvm/versions/node/v20.19.4 --strip-components=1

# mkdir -p ~/.nvm/versions/node/v22.17.0
# tar -xf /robot/.devcontainer/.nvm/node-v22.17.0-linux-x64.tar.xz -C ~/.nvm/versions/node/v22.17.0 --strip-components=1
nvm install 18
nvm install 20
nvm install 22

nvm ls
nvm use $NODE_DEFAULT

npm config set strict-ssl false
export NODE_TLS_REJECT_UNAUTHORIZED=0
echo "Installing Yarn..."
npm install --global yarn

# PIP Config
echo "PIP Config"
mkdir -p ~/.pip
cp /robot/.devcontainer/pip.conf "$HOME/.pip/pip.conf"
pip config list --verbose

echo "Installing Robot Framework, Playwright and Extensions..."
pip install --no-cache-dir -r /robot/.devcontainer/robot-requirements.txt
rfbrowser init

# Đánh dấu đã cài
touch "$HOME/.installed"