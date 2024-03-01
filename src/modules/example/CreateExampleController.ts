import { Controller, Post } from '@nestjs/common';
import { ExampleRepository } from './ExampleRepository';
import { ExampleEntity } from './ExampleEntity';

@Controller('/example')
export class CreateExampleController {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  @Post()
  public async execute(): Promise<void> {
    const newExample = ExampleEntity.new({ name: 'This', surname: 'Example' });
    console.log(newExample);

    await this.exampleRepository.createExample(newExample);
  }
}