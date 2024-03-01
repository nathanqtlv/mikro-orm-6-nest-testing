import { Global, Module } from '@nestjs/common';

import { Configuration } from './Configuration';

@Global()
@Module({
  providers: [
    {
      provide: Configuration,
      useFactory: () => new Configuration(process.env),
    },
  ],
  exports: [Configuration],
})
export class ConfigurationModule {}
