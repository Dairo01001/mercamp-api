import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from '../schemas';
import { requestFail } from '../../shared';
import userService from '../services/UserService';

export const createUser = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response): Promise<void | any> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    requestFail(res, error);
  }
};

export default {
  createUser,
};
