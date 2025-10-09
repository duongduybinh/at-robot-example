export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use $NODE_DEFAULT
pip --version
{
    export NODE_TLS_REJECT_UNAUTHORIZED=0
    export SHARP_USE_SYSTEM_LIBVIPS=1
    unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy
    yarn config delete proxy && \
      yarn config delete https-proxy &&\
      yarn config set registry http://registry.npmjs.org/
} >/dev/null 2>&1