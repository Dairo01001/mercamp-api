import { User } from '../models';
import { CreateUserInput } from '../schemas';
import { PrismaService } from '../../services';
import { HttpRequestError } from '../../utils';
import { StatusCodes } from 'http-status-codes';

const prisma = PrismaService.getInstance();

export const createUser = async (user: CreateUserInput['body']): Promise<User> => {
  const { username, password } = user;

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    throw new HttpRequestError('Username already exists', StatusCodes.CONFLICT);
  }

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  return newUser;
};
