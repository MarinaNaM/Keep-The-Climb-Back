import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSectorDto } from 'src/sector/dto/create-sector.dto';

describe('SectorController (e2e)', () => {
    let app: INestApplication;

    let user1Token: string;

    let sectorId: string;

    const mockSector: CreateSectorDto = {
        name: 'sector-test',
        img: 'src',
        hoursSun: 'mañana',
        localization: {
            lat: 1234,
            lng: 5678,
        },
        routes: [],
    };

    const mockUser1: CreateUserDto = {
        name: 'usersector-test',
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
        user1Token = response.body.token;
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + user1Token);

        await app.close();
    });

    test('/sector (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/sector')
            .send(mockSector)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(201);
        sectorId = response.body._id;
    });
    test('/sector (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/sector');
        expect(response.status).toBe(200);
    });
    test('/sector/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/sector/' + sectorId)
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test('/sector/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/sector/' + sectorId)
            .send({ name: 'updated test' })
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated test');
    });
    test('/sector/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/sector/' + sectorId)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
});
