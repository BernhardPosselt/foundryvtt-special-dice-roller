#!/usr/bin/env bash

# Run with ./package.sh 0.0.2
# requires zip, curl, jq

set -e

version="$1"

yarn run test
yarn run clean
yarn run build

# create release directories
rm -rf ./build
mkdir -p build/foundryvtt-special-dice-roller/

# create archive
node ./scripts/update-module-json.mjs "$version"
cp module.json README.md LICENSE CHANGELOG.md build/foundryvtt-special-dice-roller/
cp -r dist/ docs/ public/ build/foundryvtt-special-dice-roller/

cd build
zip -r release.zip foundryvtt-special-dice-roller
cd -
