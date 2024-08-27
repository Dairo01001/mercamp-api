import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const signInHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ token: 'token', refreshToken: 'refreshToken' });
};
