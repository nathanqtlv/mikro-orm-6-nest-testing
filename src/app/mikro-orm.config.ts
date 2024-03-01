import { Configuration } from '@common';

import { MikroOrmConfig } from './MikroOrmConfig';

const config = Configuration.fromEnv();

export default Promise.resolve(MikroOrmConfig.fromConfiguration(config));
