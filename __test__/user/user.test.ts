import { afterAll, describe, it } from '@jest/globals';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import createApp from '../../src/app';
import { ICreatedUserResponse, ICreateUserRequest } from '../../src/user';
import { PrismaService } from '../../src/shared';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller /api/users', () => {
  beforeAll(async () => {
    await prisma.users.create({
      data: {
        email: 'dairo@gmail.com',
        username: 'Dairo',
        password: 'Dairo_1234',
      },
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.users.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/users with valid body', () => {
    const newUser: ICreateUserRequest = {
      email: 'admin@gmail.com',
      username: 'Admin',
      password: 'Admin_1234',
    };

    const newUserRes: ICreatedUserResponse = {
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

  it('POST /api/users with empty', () => {
    return supertest(app)
      .post('/api/users')
      .send({})
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('POST /api/users with username empty', () => {
    const newUser = {
      email: 'dairo@gmail.com',
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect('content-type', /json/)
      .expect(StatusCodes.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0].label).toBe('username');
        expect(res.body[0].message).toBe('Username is required');
      });
  });

  it('POST /api/users with email already exists', () => {
    const newUser = {
      email: 'dairo@gmail.com',
      username: 'Dairo',
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect('content-type', /json/)
      .expect(StatusCodes.CONFLICT)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Email already exists' });
      });
  });
});
