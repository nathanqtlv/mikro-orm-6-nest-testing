import { DynamicModule, Module } from '@nestjs/common';

import { ServerModule } from './server/ServerModule';

@Module({
  imports: [ServerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static forApi(): DynamicModule {
    return { module: AppModule };
  }
}
