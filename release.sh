#!/usr/bin/env bash

# Run with ./release.sh 0.0.2 "$GITHUB_TOKEN" "$FOUNDRY_ROLLER_TOKEN"
# requires zip, curl, jq

set -e

version="$1"
token="$2"
ftoken="$3"

./package.sh "$1"

# push new code
git add module.json
git commit -m "Release $version"
git tag "$version"
git push
git push --tags

# upload release zip
id=$(curl --no-progress-meter -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token $token" "https://api.github.com/repos/BernhardPosselt/foundryvtt-special-dice-roller/releases" -d "{\"tag_name\":\"$version\",\"target_commitish\":\"master\",\"name\":\"$version\",\"body\":\"\",\"draft\":false,\"prerelease\":false,\"generate_release_notes\":false}" | jq ".id")
curl -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token $token" -H "Content-Type: application/zip" "https://uploads.github.com/repos/BernhardPosselt/foundryvtt-special-dice-roller/releases/$id/assets?name=release.zip" --data-binary "@build/release.zip"
# call foundry api
curl -X POST -H "Content-Type: application/json" -H "Authorization: $ftoken" -d "{\"id\":\"special-dice-roller\",\"dry-run\":false,\"release\":{\"version\":\"$version\",\"manifest\":\"https://raw.githubusercontent.com/BernhardPosselt/foundryvtt-special-dice-roller/$version/module.json\",\"notes\":\"https://github.com/BernhardPosselt/foundryvtt-special-dice-roller/blob/master/CHANGELOG.md\",\"compatibility\":{\"minimum\":\"12\",\"verified\":\"12\",\"maximum\":\"12\"}}}" "https://api.foundryvtt.com/_api/packages/release_version/"
