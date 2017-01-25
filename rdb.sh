#!/usr/bin/env bash
source .env

REDIS_CONTAINER_RUNNING=$(docker inspect -f {{.State.Running}} $(docker-compose ps -q redis))
if [ $REDIS_CONTAINER_RUNNING == "true" ]; then
  docker-compose exec redis redis-cli
else
  echo "Redis container is not running"
fi
