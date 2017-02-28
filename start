#!/usr/bin/env bash
source .env

if [[ $ENVIRONMENT == 'prod' ]]; then
  docker run --rm -ti --env-file .env -v "$PWD"/frontend:/src -w /src kkarczmarczyk/node-yarn yarn run build
fi

docker-compose up -d
echo ""
echo "Services:"
docker-compose ps
