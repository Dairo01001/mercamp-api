import { Router } from 'express';
import { signInHandler } from './auth.controller';
import { validateResource } from '../middlewares';
import { signInSchema } from './auth.schema';

export const authRoutes = (): Router => {
  const router = Router();

  router.post('/signin', validateResource(signInSchema), signInHandler);

  return router;
};
