import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './../src/auth/auth.constants';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
    login: 'test6@gmail.com',
    password: 'test',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body: { access_token } }) => {
                expect(access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - email fail', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'randome@mail.ru' })
            .expect(401, {
                statusCode: 401,
                message: USER_NOT_FOUND_ERROR,
                error: 'Unauthorized',
            });
    });

    it('/auth/login (POST) - password fail', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: 'testpass12' })
            .expect(401, {
                statusCode: 401,
                message: WRONG_PASSWORD_ERROR,
                error: 'Unauthorized',
            });
    });

    afterAll(() => {
        disconnect();
    });
});
