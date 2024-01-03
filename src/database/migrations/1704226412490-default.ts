import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704226412490 implements MigrationInterface {
    name = 'Default1704226412490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shopping\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`clientId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shopping\` ADD CONSTRAINT \`FK_3f0034fb0493d1f984cc8dcfb28\` FOREIGN KEY (\`clientId\`) REFERENCES \`clientinfo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shopping\` DROP FOREIGN KEY \`FK_3f0034fb0493d1f984cc8dcfb28\``);
        await queryRunner.query(`DROP TABLE \`shopping\``);
    }

}
