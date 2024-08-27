import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashedPassword, HttpRequestError } from '../../utils';
import { UserResponseDto } from '../dto';
import { ICreateUserRequest, IUser } from '../models';
import { createUser, findUserByEmail, userExists } from '../repo';

export const createUserService = async (newUser: ICreateUserRequest): Promise<UserResponseDto> => {
  const exists = await userExists(newUser.email);

  if (exists) {
    throw new HttpRequestError('Email already exists', StatusCodes.CONFLICT);
  }

  newUser.password = await hashedPassword(newUser.password);
  const user = await createUser(newUser);

  return UserResponseDto.fromUser(user);
};

export const validatePassword = async ({ email, password }: { email: string; password: string }): Promise<IUser> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new HttpRequestError('User not found', StatusCodes.NOT_FOUND);
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new HttpRequestError('Invalid password', StatusCodes.UNAUTHORIZED);
  }

  return user;
};
