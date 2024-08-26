import { INewUser, User } from '../models';
import { PrismaService } from '../../shared';

const prisma = PrismaService.getInstance();

const createUser = async (newUser: INewUser): Promise<User> => {
  return prisma.users.create({
    data: newUser,
  });
};

const exists = async (email: string): Promise<boolean> => {
  return !!(await prisma.users.findUnique({
    where: {
      email: email,
    },
  }));
};

export default {
  createUser,
  exists,
};
