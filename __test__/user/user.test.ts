import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';

import { PrismaService } from '../../src/services';
import createApp from '../../src/app';
import { StatusCodes } from 'http-status-codes';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller POST /api/user validation', () => {
  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/user with invalid body', async () => {
    return supertest(app)
      .post('/api/user')
      .send({})
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Username is required, Password is required',
        });
      });
  });

  it('POST /api/user with invalid username', async () => {
    return supertest(app)
      .post('/api/user')
      .send({ username: '', password: 'Username?1' })
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Username must be at least 4 characters',
        });
      });
  });

  it('POST /api/user with invalid password', async () => {
    return supertest(app)
      .post('/api/user')
      .send({ username: 'dairo', password: '12345678' })
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual({
          message:
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        });
      });
  });

  it('POST /api/user with valid body', () => {
    return supertest(app)
      .post('/api/user')
      .send({ username: 'Dairo Garcia', password: 'Dairo_1234' })
      .expect('content-type', /json/)
      .expect(StatusCodes.CREATED)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          username: 'Dairo Garcia',
          password: expect.any(String),
        });
      });
  });
});
