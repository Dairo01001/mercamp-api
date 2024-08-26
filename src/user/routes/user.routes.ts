import { Router } from 'express';
import { validateResource } from '../../middlewares';
import { createUserSchema } from '../schemas';
import { createUserHandler } from '../controller';

export const userRoutes = (): Router => {
  const router = Router();

  router.post('/', validateResource(createUserSchema), createUserHandler);

  return router;
};
