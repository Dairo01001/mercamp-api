import { StatusCodes } from 'http-status-codes';
import { HttpRequestError } from '../../utils';
import { UserResponseDto } from '../dto';
import { ICreateUserRequest } from '../models';
import { createUser, userExists } from '../repo';

export const createUserService = async (newUser: ICreateUserRequest): Promise<UserResponseDto> => {
  const exists = await userExists(newUser.email);

  if (exists) {
    throw new HttpRequestError('Email already exists', StatusCodes.CONFLICT);
  }
  const user = await createUser(newUser);

  return UserResponseDto.fromUser(user);
};
