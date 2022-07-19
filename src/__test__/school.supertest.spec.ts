import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateSchoolDto } from '../school/dto/create-school.dto';
import { userSchema } from 'src/user/entities/user.entity';

describe('SchoolController (e2e)', () => {
    let app: INestApplication;

    let user1Token: string;

    let schoolId: string;

    const mockSchool: CreateSchoolDto = {
        name: 'school-test',
        img: 'src',
        period: 'siempre',
        localization: {
            lat: 1234,
            lng: 5678,
        },
        sectors: [],
    };

    const mockUser1: CreateUserDto = {
        name: 'userschool-test',
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
        console.log(response.body, 'tokennn test');
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete('/user/')
            .set('Authorization', 'bearer ' + user1Token);

        await app.close();
    });

    test('/school (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/school')
            .send(mockSchool)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(201);
        schoolId = response.body._id;
    });
    test('/school (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/school');
        expect(response.status).toBe(200);
    });
    test('/school/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/school/' + schoolId)
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
    test('/school/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/school/' + schoolId)
            .send({ name: 'updated test' })
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated test');
    });
    test('/school/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/school/' + schoolId)
            .set('Authorization', 'bearer ' + user1Token);
        expect(response.status).toBe(200);
    });
});
