import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateRouteDto } from 'src/route/dto/create-route.dto';

describe('RouteController (e2e)', () => {
    let app: INestApplication;

    let user1Id: string;
    let user1Token: string;

    let routeId: string;

    const mockRoute: CreateRouteDto = {
        name: 'ruta-test',
        length: 23,
        grade: '6a',
        voteGrade: [
            {
                user: '123456789012345678901234',
                vote: '3',
            },
        ],
    };

    const mockUser1: CreateUserDto = {
        name: 'userroute-test',
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

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser1)
            .set('Accept', 'application/json');
        user1Id = response.body.user._id;
        user1Token = response.body.token;
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + user1Token);

        await app.close();
    });

    test('/route (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/route')
            .send(mockRoute)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(201);
        routeId = response.body._id;
    });
    test('/route (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/route');
        expect(response.status).toBe(200);
    });
    test('/route/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/route/' + routeId)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
    test('/route/voteRoute/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/route/voteRoute/' + routeId)
            .send({ user: user1Id, vote: '8' })
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
        expect(response.body.vote).toBe(8);
    });
    test('/route/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/route/' + routeId)
            .send({ name: 'updated test' })
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated test');
    });
    test('/route/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/route/' + routeId)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
});
