import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovingPriceColumns1757083030508 implements MigrationInterface {
    name = 'RemovingPriceColumns1757083030508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "total_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" ADD "total_price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "unit_price" numeric(10,2) NOT NULL`);
    }

}
