import { afterAll, describe, it } from '@jest/globals';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import createApp from '../../src/app';
import { PrismaService } from '../../src/services';
import { CreateUserRequest, CreateUserResponse } from '../../src/user';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller /api/users', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    const deleteUser = prisma.users.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/users with valid body', () => {
    const newUser: CreateUserRequest = {
      email: 'admin@gmail.com',
      username: 'Admin',
      password: 'Admin_1234',
      isAdmin: true,
    };

    const newUserRes: CreateUserResponse = {
      id: expect.any(String),
      username: newUser.username,
      email: newUser.email,
    };

    return supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect('content-type', /json/)
      .expect(StatusCodes.CREATED)
      .then((res) => {
        expect(res.body).toEqual(newUserRes);
      });
  });
});
