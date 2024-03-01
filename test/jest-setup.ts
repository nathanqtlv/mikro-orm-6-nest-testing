import 'reflect-metadata';
import { Configuration } from '@common';
import { app } from '@test';

Configuration.EntityMappingSchema = '*';
process.env.NODE_ENV = 'test';

beforeAll(() => app.setup());
