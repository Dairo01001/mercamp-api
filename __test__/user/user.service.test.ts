import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';

import { PrismaService } from '../../src/services';
import createApp from '../../src/app';
import { StatusCodes } from 'http-status-codes';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller POST /api/user Service', () => {
  beforeAll(async () => {
    await prisma.user.createMany({
      data: [{ username: 'dairo', password: '123456' }],
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/user with repeated username', async () => {
    return supertest(app)
      .post('/api/user')
      .send({ username: 'dairo', password: 'Dairo_1234' })
      .expect('content-type', /json/)
      .expect(StatusCodes.CONFLICT)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Username already exists',
        });
      });
  });
});
