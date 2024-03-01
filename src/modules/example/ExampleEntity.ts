import { randomUUID } from 'crypto';
import { ExampleData } from './ExampleData';
import { AuditInfo } from './AuditInfo';

export class ExampleEntity {
  constructor(private readonly data: ExampleData) {}

  public static new(params: { name: string; surname: string; }): ExampleEntity {
    const data = new ExampleData();

    data.id = randomUUID();
    data.name = params.name;
    data.surname = params.surname;
    data.auditInfo = new AuditInfo({ createdAt: new Date(), updatedAt: new Date() });

    return new ExampleEntity(data);
  }

  public getData(): ExampleData {
    return this.data;
  }

  public getId(): string {
    return this.data.id;
  }

  public getName(): string {
    return this.data.name;
  }

  public getSurname(): string {
    return this.data.surname;
  }

  public getCreatedAt(): Date {
    return this.data.auditInfo.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.data.auditInfo.updatedAt;
  }
}