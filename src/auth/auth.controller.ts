import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const signInHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ token: 'token', refreshToken: 'refreshToken' });
};

export const getCurrentUserHandler = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({ id: '1', isAdmin: false, username: 'dairo' });
};
