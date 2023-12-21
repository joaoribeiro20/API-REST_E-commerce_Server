import request from 'supertest';
import { afterEach, beforeEach, describe, it, expect } from '@jest/globals';
import routes from '../../../src/routes/Routes';
import { errorMiddleware } from '../../../src/middlewares/ErrorMiddlewares';
import { AppDataSource } from '../../../src/database/data-source';

import express, { Express } from 'express';
import http from 'http'; // Importe o tipo http




let server: http.Server; // Use http.Server como tipo

beforeEach(async () => {
    await AppDataSource.initialize();
    const app: Express = express();

    app.use(express.json());
    app.use(routes);

    console.log("Rodando em : http://localhost:8088/");
    app.use(errorMiddleware);
    server = app.listen(process.env.PORT) as http.Server; // Use as http.Server para evitar o erro de tipo
});

afterEach(async () => {
    await AppDataSource.close();
    server.close();
});

describe('Testando as rotas', () => {
    it('Teste Inicial', async () => {
        await request(server)
            .get('/')
            .send()
            .expect('Olá Mundo!');

    });

    it.skip('Criar um usuario', async () => {
        const response = await request(server)
            .post('/createUser')
            .send({
                "name": "sellerTeste3",
                "email": "ase@gmail.com",
                "password": "d555aad345",
                "roles": [],
                "permissions": []
            })
            .expect(201);

        // Check that the response body has the "id" property
        expect(response.body).toHaveProperty("id");
    });

    it('tentativa de criar um usuario ja existente', async () => {
        const response = await request(server)
            .post('/createUser')
            .send({
                "name": "sellerTeste3",
                "email": "eeee@gmail.com",
                "password": "d555aad345",
                "roles": [],
                "permissions": []
            })
            
        expect(response.status).toBe(400);
        expect(response.body).toBe('User already exists!');

    });


});

describe('Teste login',  () => {

    it("fazer login geração do token",async()=>{
        const response = await request(server)
        .post('/login')
        .send({
            "email": "eeee@gmail.com",
            "password": "d555aad345",
        })

        expect(response.body).toHaveProperty('token');
        expect(response.body.token).not.toBeNull();
        expect(response.body.token).not.toBeUndefined();
        expect(response.body.token).not.toEqual('');
    })

    it("informando email incorreto",async()=>{
        const response = await request(server)
        .post('/login')
        .send({
            "email": "22@gmail.com",
            "password": "d555aad345",
        })

        expect(response.body).toBe('Email does not exist!');
    })

    it("informando senha incorreto",async()=>{
        const response = await request(server)
        .post('/login')
        .send({
            "email": "eeee@gmail.com",
            "password": "jr55",
        })

        expect(response.body).toBe('E-mail or password is invalid');
    })
});