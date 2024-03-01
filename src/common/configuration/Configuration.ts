import { Injectable } from '@nestjs/common';

import { version } from '../../../package.json';

@Injectable()
export class Configuration {
  public readonly root: string;
  public readonly nodeEnv: string;

  public readonly appName: string;
  public readonly port: number;
  public readonly version: string = version;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.root = env.ROOT || process.cwd();
    this.appName = env.APP_NAME || 'vgp-asset-service';
    this.port = parseInt(env.PORT || '3000', 10);
    this.nodeEnv = env.NODE_ENV || 'production';
  }
}
