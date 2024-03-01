import { Test, TestingModule } from '@nestjs/testing';

import { Configuration } from '@config';
import { AppModule } from 'src/AppModule';

class TestApp {
  private api: TestingModule | undefined;

  public async setup(): Promise<void> {
    this.api = await Test.createTestingModule({
      imports: [AppModule.forApi()],
    })
      .overrideProvider(Configuration)
      .useValue(
        new Configuration({
          ...process.env,
        }),
      )
      .compile();
  }

  public teardown(): Promise<void> {
    return Promise.resolve();
  }

  public clean(): Promise<void> {
    return Promise.resolve();
  }

  public useApi(): TestingModule {
    if (!this.api) {
      throw new Error('TestApp not initialized, call setup() first');
    }

    return this.api;
  }
}

export const app = new TestApp();
