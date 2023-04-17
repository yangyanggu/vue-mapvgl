#!/bin/sh

set -e

pnpm run build

cd ../dist/vue-map
npm publish --tag=beta
cd -

echo "Publish completed"
