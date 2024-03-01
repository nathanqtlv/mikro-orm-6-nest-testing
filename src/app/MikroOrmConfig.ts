import { FlushMode } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';

import { Configuration } from '@common';

export class MikroOrmConfig {
  public static fromConfiguration(
    config: Configuration,
  ): MikroOrmModuleOptions<PostgreSqlDriver> {
    return {
      flushMode: FlushMode.COMMIT,
      ...defineConfig({
        extensions: [Migrator],
        host: config.db.host,
        port: config.db.port,
        user: config.db.username,
        password: config.db.password,
        dbName: config.db.database,
        schema: config.db.schema,
        entities: ['src/modules/**/*Schema.{js,ts}'],
        debug: config.db.enableLogging,
        forceUtcTimezone: true,
        migrations: {
          tableName: 'mikro_orm_migrations',
          path: 'src/migrations',
          disableForeignKeys: false,
          fileName: (timestamp: string, name?: string) => {
            if (!name) {
              throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
            }

            return `${timestamp}-${name}`;
          },
        },
        seeder: {
          path: 'src/seeds',
          defaultSeeder: 'DatabaseSeeder',
        },
      }),
    };
  }
}
