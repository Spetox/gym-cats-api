import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1740789591113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" varchar(256) NOT NULL,
                "name" varchar(256) NOT NULL,
                "password" varchar(256) NOT NULL,
                CONSTRAINT "user_pk" PRIMARY KEY ("id"),
                CONSTRAINT "user_name_unique" UNIQUE ("name")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
