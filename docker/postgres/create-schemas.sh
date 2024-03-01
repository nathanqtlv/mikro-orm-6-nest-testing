#!/usr/bin/env bash
set -e

echo "DB: $POSTGRES_DB"
echo "USER: $POSTGRES_USER"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE SCHEMA "test";
  GRANT USAGE ON SCHEMA "test" TO $POSTGRES_USER;
EOSQL
