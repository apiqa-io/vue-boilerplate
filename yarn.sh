#!/usr/bin/env bash
docker run --rm -ti --env-file .env -u="$UID" -v "$PWD"/"$1":/src -w /src kkarczmarczyk/node-yarn yarn "${@:2}"