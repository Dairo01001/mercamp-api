import { describe } from '@jest/globals';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import createApp from '../../src/app';
import { PrismaService } from '../../src/shared';
import { IAuth } from '../../src/auth';
import { afterEach } from 'node:test';

const app = createApp();
const prisma = PrismaService.getInstance();

beforeEach(async () => {
  await prisma.users.createMany({
    data: [
      {
        username: 'dairo',
        email: 'dairo@gmail.com',
        password: 'Dairo_1234',
      },
    ],
    skipDuplicates: true,
  });
});

afterEach(async () => {
  const deleteUser = prisma.users.deleteMany();
  await prisma.$transaction([deleteUser]);
  await prisma.$disconnect();
});

describe('SignIn Test ', () => {
  it('POST /api/auth/signin should return token and refresh token', async () => {
    const user: IAuth = {
      email: 'dairo@gmail.com',
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/auth/signin')
      .send(user)
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toEqual({
          token: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
  });

  it('GET /api/auth should return 401 if token is invalid', async () => {
    return supertest(app)
      .get('/api/auth')
      .set('Authorization', 'Bearer invalid-token')
      .expect(StatusCodes.UNAUTHORIZED);
  });

  it('GET /api/auth should return user info', async () => {
    const user: IAuth = {
      email: 'dairo@gmail.com',
      password: 'Dairo_1234',
    };

    const token = await supertest(app).post('/api/auth/signin').send(user).expect(StatusCodes.OK);

    return supertest(app)
      .get('/api/auth')
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          username: 'dairo',
          isAdmin: false,
        });
      });
  });

  it('POST /api/auth/signin with invalid body', async () => {
    const user = {
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/auth/signin')
      .send(user)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].label).toBe('email');
        expect(res.body[0].message).toBe('Email is required');
      });
  });

  it('POST /api/auth/signin with invalid email', async () => {
    const user = {
      email: 'dairogmail.com',
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/auth/signin')
      .send(user)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].label).toBe('email');
        expect(res.body[0].message).toBe('Email is invalid');
      });
  });
});
