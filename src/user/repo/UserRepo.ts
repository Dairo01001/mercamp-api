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
