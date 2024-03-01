import { join, resolve } from 'path';

import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import * as envVar from 'env-var';

import { version } from '../../../package.json';

@Injectable()
export class Configuration {
  /// <summary>
  /// Database schema to use for MikroORM EntitySchemas.
  /// Otherwise entities will be ignored by the migrations
  /// Using multiple schema allow us to run tests in parallel
  /// For tests use: '*'
  /// For production use: undefined
  /// https://mikro-orm.io/docs/multiple-schemas#note-about-migrations
  /// </summary>
  public static EntityMappingSchema?: string = undefined;

  public readonly root: string;
  public readonly nodeEnv: string;

  public readonly appName: string;
  public readonly port: number;
  public readonly version: string = version;

  public readonly db: {
    database: string;
    host: string;
    password: string;
    port: number;
    username: string;
    dropSchema: boolean;
    synchronize: boolean;
    schema: string;
    enableLogging: boolean;
  };

  constructor(envValues: NodeJS.ProcessEnv = process.env) {
    const env = envVar.from(envValues);

    this.root = env.get('ROOT').default(process.cwd()).asString();
    this.appName = env.get('APP_NAME').default('mikro_orm_6_nest_testing').asString();
    this.port = env.get('PORT').default('3003').asPortNumber();
    this.nodeEnv = env.get('NODE_ENV').default('production').asEnum(['production', 'test', 'development']);

    this.db = {
      username: env.get('DB_USER').default('mikro_orm_6_nest_testing').asString(),
      password: env.get('DB_PASSWORD').required().asString(),
      database: env.get('DB_NAME').default('mikro_orm_6_nest_testing').asString(),
      host: env.get('DB_HOST').required().asString(),
      port: env.get('DB_PORT').default('5432').asPortNumber(),
      dropSchema: env.get('DB_DROP_SCHEMA').default('false').asBool(),
      synchronize: env.get('DB_SYNCHRONIZE').default('false').asBool(),
      schema: env.get('DB_SCHEMA').default('public').asString(),
      enableLogging: env.get('DB_ENABLE_LOGGING').default('false').asBool(),
    };
  }

  public static fromEnv(): Configuration {
    const NODE_ENV = process.env.NODE_ENV || 'production';
    const dotEnvFile = NODE_ENV === 'test' ? '.env.test' : '.env';

    const ROOT = resolve(join(__dirname, '..', '..', '..'));

    process.env.ROOT = ROOT;
    dotenv.config({ path: join(ROOT, dotEnvFile) });

    return new Configuration(process.env);
  }
}
