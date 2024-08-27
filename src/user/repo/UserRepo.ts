import { INewUser, IUser } from '../models';
import { PrismaService } from '../../shared';

const prisma = PrismaService.getInstance();

export const createUser = async (newUser: INewUser): Promise<IUser> => {
  return prisma.users.create({
    data: newUser,
  });
};

export const userExists = async (email: string): Promise<boolean> => {
  return !!(await prisma.users.findUnique({
    where: {
      email: email,
    },
  }));
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};
