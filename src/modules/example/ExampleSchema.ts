import { Configuration } from '@common';
import { ExampleData } from './ExampleData';
import { EntitySchema } from '@mikro-orm/core';

export const ExampleSchema = new EntitySchema<ExampleData, object>({
  class: ExampleData,
  tableName: 'examples',
  schema: Configuration.EntityMappingSchema,
  properties: {
    id: { type: 'uuid', primary: true },
    name: { type: 'varchar' },
    surname: { type: 'varchar' },
    auditInfo: { kind: 'embedded', type: 'AuditInfo', prefix: false },
  },
});