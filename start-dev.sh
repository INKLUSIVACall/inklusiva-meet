#!/bin/bash

# Rebuild lib-jitsi-meet
#cd node_modules/lib-jitsi-meet
#npm run watch &
#cd ../..

# Start the development server
export WEBPACK_DEV_SERVER_PROXY_TARGET=https://inklusiva-meet.4morgen.de
make dev
#npm run start
