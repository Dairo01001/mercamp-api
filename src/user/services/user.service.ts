import { CreateUserResponse } from '../models';
import { CreateUserInput } from '../schemas';
import { PrismaService } from '../../services';
import { HttpRequestError } from '../../utils';
import { StatusCodes } from 'http-status-codes';

const prisma = PrismaService.getInstance();

export const createUser = async (newUser: CreateUserInput['body']): Promise<CreateUserResponse> => {
  const userExists = await prisma.users.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (userExists) {
    throw new HttpRequestError('Email already exists', StatusCodes.CONFLICT);
  }

  const createdUser = await prisma.users.create({
    data: newUser,
  });

  return {
    id: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
  };
};
