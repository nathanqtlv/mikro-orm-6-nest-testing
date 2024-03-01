import { join, resolve } from 'path';

import dotenv from 'dotenv';

export function setupEnv(): void {
  const NODE_ENV = process.env.NODE_ENV || 'production';
  const dotEnvFile = NODE_ENV === 'test' ? '.env.test' : '.env';

  const ROOT = resolve(join(__dirname, '..', '..', '..'));
  process.env.ROOT = ROOT;
  dotenv.config({ path: join(ROOT, dotEnvFile) });
}
