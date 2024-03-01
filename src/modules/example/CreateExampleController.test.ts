import { Response } from 'supertest';

import { app } from '@test';

describe('CreateExampleController.test', () => {
  describe('create', () => {
    const URL = '/example';

    it('should create an example entity', async () => {
      const response = await run();

      expectSuccess(response);
    });

    function run(): Promise<Response> {
      return app.request().post(URL).send();
    }

    function expectSuccess(response: Response): void {
      expect(response.statusCode).toBe(201);
    }
  });
});
