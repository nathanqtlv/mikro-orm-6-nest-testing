import { CommonModule, Configuration } from '@common';
import { Options } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DynamicModule, Module } from '@nestjs/common';
import { MikroOrmConfig } from './MikroOrmConfig';
import { ExampleModule } from 'src/modules/example';

@Module({
  imports: [
    CommonModule,
    MikroOrmModule.forRootAsync({
      useFactory: (config: Configuration): Options<PostgreSqlDriver> =>
        MikroOrmConfig.fromConfiguration(config),
      inject: [Configuration],
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static forApi(): DynamicModule {
    return { module: AppModule };
  }
}
