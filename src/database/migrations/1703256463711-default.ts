import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1703256463711 implements MigrationInterface {
    name = 'Default1703256463711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clientinfo\` (\`id\` varchar(36) NOT NULL, \`idUserClient\` varchar(255) NOT NULL, \`cpf\` int NOT NULL, \`celular\` int NOT NULL, \`cep\` int NOT NULL, \`cidade\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`numero\` int NOT NULL, UNIQUE INDEX \`IDX_94f5f14bc5e806a9afbb89b7c9\` (\`idUserClient\`), UNIQUE INDEX \`IDX_9233a6da36670d9eb85946cce2\` (\`cpf\`), UNIQUE INDEX \`IDX_e17cbe76eb88ac516e94f7c557\` (\`celular\`), UNIQUE INDEX \`IDX_fdedd4e470a4d4efa74afd9d1c\` (\`cep\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sellerinfo\` (\`id\` varchar(36) NOT NULL, \`idUserSeller\` varchar(255) NOT NULL, \`cnpj\` int NOT NULL, \`telefone\` int NOT NULL, \`celular\` int NOT NULL, \`cep\` int NOT NULL, \`cidade\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`razaoSocial\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b5e583bed44dba2a57193fa3e6\` (\`idUserSeller\`), UNIQUE INDEX \`IDX_85b81820087f431a799a05bb35\` (\`cnpj\`), UNIQUE INDEX \`IDX_856ce874b4e922b86a643ec725\` (\`telefone\`), UNIQUE INDEX \`IDX_48b4eb92cc8019519a0659b30f\` (\`celular\`), UNIQUE INDEX \`IDX_ed3624328c9a1533e8d5183fad\` (\`razaoSocial\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ed3624328c9a1533e8d5183fad\` ON \`sellerinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_48b4eb92cc8019519a0659b30f\` ON \`sellerinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_856ce874b4e922b86a643ec725\` ON \`sellerinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_85b81820087f431a799a05bb35\` ON \`sellerinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5e583bed44dba2a57193fa3e6\` ON \`sellerinfo\``);
        await queryRunner.query(`DROP TABLE \`sellerinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdedd4e470a4d4efa74afd9d1c\` ON \`clientinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_e17cbe76eb88ac516e94f7c557\` ON \`clientinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_9233a6da36670d9eb85946cce2\` ON \`clientinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_94f5f14bc5e806a9afbb89b7c9\` ON \`clientinfo\``);
        await queryRunner.query(`DROP TABLE \`clientinfo\``);
    }

}
