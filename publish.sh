#!/bin/bash

set -a;source config.env;set +a

npm config set registry $REGISTRY
npm config set -- //${REGISTRY#*://}:_authToken=$TOKEN
npm publish
echo "" > /Users/ktw/.npmrc
