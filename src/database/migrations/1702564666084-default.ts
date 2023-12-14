import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702564666084 implements MigrationInterface {
    name = 'Default1702564666084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions_roles\` (\`role_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` (\`role_id\`), INDEX \`IDX_3309f5fa8d95935f0701027f2b\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, INDEX \`IDX_e4435209df12bc1f001e536017\` (\`user_id\`), INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_permissions\` (\`user_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_4de7d0b175f702be3be5527002\` (\`user_id\`), INDEX \`IDX_b09b9a210c60f41ec7b453758e\` (\`permission_id\`), PRIMARY KEY (\`user_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_e08f6859eaac8cbf7f087f64e2b\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_3309f5fa8d95935f0701027f2bd\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_4de7d0b175f702be3be55270023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_b09b9a210c60f41ec7b453758e9\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_b09b9a210c60f41ec7b453758e9\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_4de7d0b175f702be3be55270023\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_3309f5fa8d95935f0701027f2bd\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_e08f6859eaac8cbf7f087f64e2b\``);
        await queryRunner.query(`DROP INDEX \`IDX_b09b9a210c60f41ec7b453758e\` ON \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_4de7d0b175f702be3be5527002\` ON \`users_permissions\``);
        await queryRunner.query(`DROP TABLE \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3309f5fa8d95935f0701027f2b\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`permissions_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
