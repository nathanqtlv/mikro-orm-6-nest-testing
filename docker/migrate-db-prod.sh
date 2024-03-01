#!/bin/sh
PATH=$PATH:/home/node/app/node_modules/.bin

# This line can be removed once it has been executed on all environments
# We redirect errors to /dev/null as it fails if it was already applied
mikro-orm migration:up --only "0000000000000-MigrateToMikroOrm" 2>/dev/null
set -e
mikro-orm migration:up

if [[ "$1" == "--seed" ]]; then
  mikro-orm seeder:run
fi
