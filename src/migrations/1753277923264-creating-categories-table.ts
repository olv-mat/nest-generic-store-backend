import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingCategoriesTable1753277923264 implements MigrationInterface {
    name = 'CreatingCategoriesTable1753277923264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."categories_name_enum" AS ENUM('clothing', 'food', 'technology')`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."categories_name_enum" NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TYPE "public"."categories_name_enum"`);
    }

}
