import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702914558599 implements MigrationInterface {
    name = 'Default1702914558599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`stock\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`weight\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`weight\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`weight\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`weight\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`stock\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\` (\`name\`)`);
    }

}
