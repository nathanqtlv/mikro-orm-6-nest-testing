import { randomUUID } from 'crypto';
import { resolve } from 'path';

import { EntityManager } from '@mikro-orm/postgresql';
import { INestApplication, Type } from '@nestjs/common';
import dotenv from 'dotenv';
import superRequest from 'supertest';

import { Configuration } from '@common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app/AppModule';

class TestApp {
  private api: TestingModule | null = null;
  private other: TestingModule | null = null;
  private nestApp!: INestApplication;

  public async setup(): Promise<void> {
    const apiEnv = {
      ...dotenv.config({ path: resolve(__dirname, '..', '.env.test') }).parsed,
      APP_NAME: 'apiTest',
      DB_SCHEMA: `test_${process.pid}_${randomUUID()}`,
    };


    this.api = await Test.createTestingModule({
      imports: [AppModule.forApi()],
    })
      .overrideProvider(Configuration)
      .useValue(
        new Configuration({
          ...apiEnv,
        }),
      )
      .compile();

    this.nestApp = this.api.createNestApplication();

    await this.nestApp.init();

    const otherEnv = {
      ...apiEnv,
      APP_NAME: 'otherTest',
    }

    this.other = await Test.createTestingModule({
      imports: [AppModule.forApi()],
    })
      .overrideProvider(Configuration)
      .useValue(
        new Configuration({
          ...otherEnv,
        }),
      )
      .compile();
  }

  public get entityManager(): EntityManager {
    return this.useApi().get(EntityManager).fork();
  }

  public get otherEntityManager(): EntityManager {
    return this.useOther().get(EntityManager).fork();
  }

  public async resolve<TInput = unknown, TResult = TInput>(
    typeOrToken: Type<TInput> | string | symbol,
  ): Promise<TResult> {
    return this.useApi().resolve<TInput, TResult>(typeOrToken);
  }

  public get<TInput = unknown, TResult = TInput>(typeOrToken: Type<TInput> | string | symbol): TResult {
    return this.useApi().get<TInput, TResult>(typeOrToken);
  }

  public useHttpServer(): unknown {
    return this.nestApp.getHttpServer();
  }

  public requestAnonymous(): superRequest.SuperTest<superRequest.Test> {
    return superRequest(this.useHttpServer());
  }

  public request(): {
    delete(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    get(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    head(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    options(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    patch(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    post(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
    put(url: string, callback?: superRequest.CallbackHandler): superRequest.Test;
  } {
    const innerRequest = superRequest(this.useHttpServer());

    return {
      delete: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.delete(url, callback),
      get: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.get(url, callback),
      head: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.head(url, callback),
      options: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.options(url, callback),
      patch: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.patch(url, callback),
      post: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.post(url, callback),
      put: (url: string, callback?: superRequest.CallbackHandler): superRequest.Test =>
        innerRequest.put(url, callback),
    };
  }

  private useApi(): TestingModule {
    if (!this.api) {
      throw new Error('TestApp not initialized, call setup() first');
    }

    return this.api;
  }

  private useOther(): TestingModule {
    if (!this.other) {
      throw new Error('TestApp not initialized, call setup() first');
    }

    return this.other;
  }
}

export type TestAppType = InstanceType<typeof TestApp>;
export const app = new TestApp();
