import { Router } from 'express';
import { getCurrentUserHandler, signInHandler } from './auth.controller';
import { validateResource } from '../middlewares';
import { signInSchema } from './auth.schema';
import { deserializeUser } from '../middlewares/deserializeUser';

export const authRoutes = (): Router => {
  const router = Router();

  router.post('/signin', validateResource(signInSchema), signInHandler);
  router.get('/', deserializeUser, getCurrentUserHandler);

  return router;
};
