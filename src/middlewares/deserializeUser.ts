import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../auth';
import { StatusCodes } from 'http-status-codes';

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  if (accessToken) {
    const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    const refreshToken = get(req, 'headers.x-refresh');

    if (expired && refreshToken) {
    }
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
};
