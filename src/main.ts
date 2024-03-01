import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

// eslint-disable-next-line no-void
void bootstrap();
