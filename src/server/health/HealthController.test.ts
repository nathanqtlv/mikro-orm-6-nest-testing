import { app } from '@test';

import { HealthController } from './HealthController';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(() => {
    healthController = app.useApi().get<HealthController>(HealthController);
  });

  describe('check', () => {
    it('should respond with an ok status', async () => {
      const result = await healthController.check();
      expect(result.status).toEqual('ok');
    });
  });
});
