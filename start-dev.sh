#!/bin/bash

# Rebuild lib-jitsi-meet
cd node_modules/lib-jitsi-meet
npm run build
cd ../..

# Start the development server
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://jitsi.intern.4morgen.de
make dev
