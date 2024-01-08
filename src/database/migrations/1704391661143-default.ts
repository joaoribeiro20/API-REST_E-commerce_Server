import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704391661143 implements MigrationInterface {
    name = 'Default1704391661143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shopping\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`clientId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shopping_product\` (\`shopping_id\` varchar(255) NOT NULL, \`product_id\` varchar(255) NOT NULL, INDEX \`IDX_bb53230a724e59f1faab5926aa\` (\`shopping_id\`), INDEX \`IDX_3f90474fc817edfa926e08ffa0\` (\`product_id\`), PRIMARY KEY (\`shopping_id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shopping\` ADD CONSTRAINT \`FK_3f0034fb0493d1f984cc8dcfb28\` FOREIGN KEY (\`clientId\`) REFERENCES \`clientinfo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shopping_product\` ADD CONSTRAINT \`FK_bb53230a724e59f1faab5926aa4\` FOREIGN KEY (\`shopping_id\`) REFERENCES \`shopping\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`shopping_product\` ADD CONSTRAINT \`FK_3f90474fc817edfa926e08ffa0d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shopping_product\` DROP FOREIGN KEY \`FK_3f90474fc817edfa926e08ffa0d\``);
        await queryRunner.query(`ALTER TABLE \`shopping_product\` DROP FOREIGN KEY \`FK_bb53230a724e59f1faab5926aa4\``);
        await queryRunner.query(`ALTER TABLE \`shopping\` DROP FOREIGN KEY \`FK_3f0034fb0493d1f984cc8dcfb28\``);
        await queryRunner.query(`DROP INDEX \`IDX_3f90474fc817edfa926e08ffa0\` ON \`shopping_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb53230a724e59f1faab5926aa\` ON \`shopping_product\``);
        await queryRunner.query(`DROP TABLE \`shopping_product\``);
        await queryRunner.query(`DROP TABLE \`shopping\``);
    }

}
