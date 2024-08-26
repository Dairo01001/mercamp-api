import { PrismaService } from '../../services';
import { HttpRequestError } from '../../utils';
import { StatusCodes } from 'http-status-codes';
import { UserResponseDto } from '../dto';
import { CreateUserRequest } from '../models';

const prisma = PrismaService.getInstance();

export const createUser = async (newUser: CreateUserRequest): Promise<UserResponseDto> => {
  const isUser = await prisma.users.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (isUser) {
    throw new HttpRequestError('Email already exists', StatusCodes.CONFLICT);
  }

  const createdUser = await prisma.users.create({
    data: newUser,
  });

  return UserResponseDto.fromPrisma(createdUser);
};
