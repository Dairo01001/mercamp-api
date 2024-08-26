import { StatusCodes } from 'http-status-codes';
import { HttpRequestError } from '../../utils';
import { UserResponseDto } from '../dto';
import { CreateUserRequest } from '../models';
import userRepo from '../repo/UserRepo';

const createUser = async (newUser: CreateUserRequest): Promise<UserResponseDto> => {
  const exists = await userRepo.exists(newUser.email);

  if (exists) {
    throw new HttpRequestError('Email already exists', StatusCodes.CONFLICT);
  }
  const user = await userRepo.createUser(newUser);

  return UserResponseDto.fromUser(user);
};

export default {
  createUser,
};
