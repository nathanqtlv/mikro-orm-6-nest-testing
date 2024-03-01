import { Global, Module } from '@nestjs/common';

import { Configuration } from './Configuration';

@Global()
@Module({
  providers: [
    {
      provide: Configuration,
      useFactory: () => Configuration.fromEnv(),
    },
  ],
  exports: [Configuration],
})
export class CommonModule {}
