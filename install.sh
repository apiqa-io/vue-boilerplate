#!/usr/bin/env bash
source .env

echo "Installing USM-boilerplate"

echo "Pulling and building docker images"
# docker-compose build
docker-compose pull

echo "Starting DB"
docker run -d --env-file .env -v "$PWD"/data_postgres:/var/lib/postgresql/data --name pg_init_db postgres:9.5 > /dev/null
docker run --rm -v "$PWD":/src -w /src --link pg_init_db:postgres --name pg_init_db_w8 appropriate/nc sh -c "echo \"Waiting for postgres container...\"; until nc -z postgres 5432 &> /dev/null; do sleep 2; done"
echo "Initializing DB"
docker run --rm --link pg_init_db:postgres --name pg_init_db_app postgres:9.5 psql -h postgres -U postgres -c "CREATE DATABASE $PG_DB_NAME;"
docker run --rm --link pg_init_db:postgres --name pg_init_db_app postgres:9.5 psql -h postgres -U postgres -c "ALTER USER $PG_DB_USER WITH SUPERUSER PASSWORD '$PG_DB_PASS';"
# docker run --rm -v "$PWD"/database:/src --link pg_init_db:postgres --name pg_init_db_app postgres:9.5 psql -h postgres -U postgres -d ${PG_DB_NAME} -f /src/test_data.sql
echo "DB init successful"
docker stop pg_init_db > /dev/null
docker rm pg_init_db > /dev/null

echo "Installing node packages"
docker run --rm -ti --env-file .env -v "$PWD"/admin:/src -w /src node:6 npm install
docker run --rm -ti --env-file .env -v "$PWD"/api:/src -w /src node:6 npm install
docker run --rm -ti --env-file .env -v "$PWD"/frontend:/src -w /src node:6 npm install

echo ""
echo "    +-------------------------------------------------------------------+"
echo "    | It seems that the installation was successful.                    |"
echo "    | Now run ./start.sh to start DPathology and open http://localhost  |"
echo "    | Login: admin                                                      |"
echo "    | Password: 11aaAA                                                  |"
echo "    +-------------------------------------------------------------------+"
echo ""
