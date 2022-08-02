import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let user1Id: string;
    let user2Id: string;
    let user1Token: string;
    let user2Token: string;

    const mockUser1: CreateUserDto = {
        name: 'user1-test',
        psw: '12345678',
        img: 'src',
        email: 'user1@test.com',
        address: {
            community: 'Comunidad',
            province: 'Provincia',
        },
        role: 'admin',
        routes: [
            {
                route: '123456789012345678906789',
                isProject: false,
                isEnchain: false,
            },
        ],
    };

    const mockUser2: CreateUserDto = {
        name: 'user2-test',
        psw: '1234567890',
        img: 'src',
        email: 'user2@test.com',
        address: {
            community: 'Comunidad',
            province: 'Provincia',
        },
        role: 'user',
        routes: [
            {
                route: '123456789012345678901234',
                isProject: false,
                isEnchain: false,
            },
        ],
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser1)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        user1Token = response.body.token;
    });
    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser2)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        user2Token = response.body.token;
        user2Id = response.body.user._id;
    });
    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send({ name: 'user' })
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });
    test('/user/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'user1@test.com',
                psw: '12345678',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        user1Id = response.body.user._id;
    });
    test('/user (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user')
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
    test('/user/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user/' + user2Id)
            .set('Authorization', 'bearer ' + user2Token);
        expect(response.status).toBe(200);
    });
    test('/user/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/user/' + user2Id)
            .send({ name: 'updated test' })
            .set('Authorization', 'bearer ' + user2Token);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated test');
    });
    test('/user (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/user')
            .set('Authorization', 'bearer ' + user2Token);
        expect(response.status).toBe(200);
    });
    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/user/' + user1Id)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
});
