#!/bin/bash

# Rebuild lib-jitsi-meet
#cd node_modules/lib-jitsi-meet
#npm run watch &
#cd ../..

# Start the development server
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://inklusiva-meet.4morgen.de
export WEBPACK_DEV_SERVER_LISTEN_HOST=0.0.0.0
export WEBPACK_DEV_SERVER_LISTEN_PORT=8080
make dev
#npm run start
