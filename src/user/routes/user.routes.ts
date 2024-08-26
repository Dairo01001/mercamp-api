import { Router } from 'express';
import { validateResource } from '../../middlewares';
import { createUserSchema } from '../schemas';
import userController from '../controller/UserController';

export const userRoutes = (): Router => {
  const router = Router();

  router.post('/', validateResource(createUserSchema), userController.createUser);

  return router;
};
