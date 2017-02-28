#!/usr/bin/env bash
source .env

PG_CONTAINER_RUNNING=$(docker inspect -f {{.State.Running}} $(docker-compose ps -q postgres))
if [ $PG_CONTAINER_RUNNING == "true" ]; then
  docker-compose exec postgres psql -h localhost -U $PG_DB_USER -d $PG_DB_NAME "$@"
else
  echo "Postgres container is not running"
fi
