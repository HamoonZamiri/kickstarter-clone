import { MigrationInterface, QueryRunner } from "typeorm"

export class Initial1665185424308 implements MigrationInterface {
    name = "Initial1665185424308";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" integer NOT NULL, "title" character varying NOT NULL PRIMARY KEY ("id")))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
