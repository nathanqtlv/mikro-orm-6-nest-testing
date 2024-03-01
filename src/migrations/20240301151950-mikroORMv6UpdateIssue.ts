import { Migration } from '@mikro-orm/migrations';

export class Migration20240301151950_mikroORMv6UpdateIssue extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "examples" ("id" uuid not null, "name" varchar(255) not null, "surname" varchar(255) not null, "created_at" timestamptz(3) not null default now(), "updated_at" timestamptz(3) not null default now(), constraint "examples_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "examples" cascade;');
  }

}
