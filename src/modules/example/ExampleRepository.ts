import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ExampleEntity } from './ExampleEntity';
import { ExampleData } from './ExampleData';

@Injectable()
export class ExampleRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public createExample(example: ExampleEntity): Promise<ExampleEntity> {
    const exampleData = this.entityManager.create(ExampleData, example.getData());

    this.entityManager.persist(exampleData);

    return Promise.resolve(new ExampleEntity(exampleData));
  }
}