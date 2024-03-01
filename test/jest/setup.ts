import 'reflect-metadata';
import { setupEnv } from '@config';
import { app } from '@test';

process.env.NODE_ENV = 'test';

setupEnv();

beforeAll(() => app.setup());
afterAll(async () => {
  await app.clean();
  await app.teardown();
});
beforeEach(() => app.clean());
