import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ExampleData } from './ExampleData';
import { CreateExampleController } from './CreateExampleController';
import { ExampleRepository } from './ExampleRepository';

@Module({
  imports: [MikroOrmModule.forFeature([ExampleData])],
  controllers: [CreateExampleController],
  providers: [ExampleRepository],
})
export class ExampleModule {}