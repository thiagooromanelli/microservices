#!/bin/bash

if [[ -z $NODE_EXTRA_CA_CERTS ]]; then
    export NODE_EXTRA_CA_CERTS=~/.blz-pki/BelezaNaWebPrivateCA.pem
    echo "Injecting envvar: NODE_EXTRA_CA_CERTS=$NODE_EXTRA_CA_CERTS"
fi

case "$1" in
  dev)
    echo 'Starting...'
    export DEBUG=courier:*
    nodemon index.js $ENV
  ;;
  test)
    export DEBUG=courier:*
    export LOGGER_LEVEL=debug
    export NODE_ENV=qa
    export NODE_PATH=./server
    nyc _mocha --exit
  ;;
  build)
    echo 'Building...'
    rm -rf node_modules
    npm install
    git checkout package-lock.json
    mkdir -p dist
    cp -r server dist/
    cp -r node_modules dist/
    cp index.js dist/
    cp package.json dist/
    cp newrelic.js dist/
  ;;
  *)
    echo "Usage: {start|test|build}"
    exit 1
  ;;
esac
