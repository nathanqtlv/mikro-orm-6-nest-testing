import { EntitySchema } from '@mikro-orm/core';

import { AuditInfo } from './AuditInfo';

export const AuditInfoSchema = new EntitySchema<AuditInfo, object>({
  class: AuditInfo,
  embeddable: true,
  properties: {
    createdAt: { type: Date, length: 3, onCreate: () => new Date(), defaultRaw: 'now()' },
    updatedAt: { type: Date, length: 3, onCreate: () => new Date(), onUpdate: () => new Date(), defaultRaw: 'now()' },
  },
});
