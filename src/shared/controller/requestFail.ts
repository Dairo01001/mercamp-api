import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpRequestError } from '../../utils';

export const requestFail = (res: any, error: any) => {
  if (error instanceof HttpRequestError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};
