import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/AppModule';
import { Configuration } from '@common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule.forApi(), {
    bufferLogs: true,
  });

  const { port } = app.get(Configuration);

  // increase max body size to avoid getting 413 errors when sending large payload
  app.useBodyParser('json');

  await app.listen(port);
}

// eslint-disable-next-line no-void
void bootstrap();
