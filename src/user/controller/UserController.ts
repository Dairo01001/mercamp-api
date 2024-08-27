import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from '../schemas';
import { requestFail } from '../../shared';
import { createUserService } from '../services/UserService';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
): Promise<void | any> => {
  try {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    requestFail(res, error);
  }
};
