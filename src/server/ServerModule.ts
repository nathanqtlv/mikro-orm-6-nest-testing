import { Module } from '@nestjs/common';

import { HealthModule } from './health/HealthModule';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class ServerModule {}
