import { Application } from 'express';
import { userRoutes } from './user';
import { authRoutes } from './auth';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/api/users', userRoutes());
  app.use('/auth', authRoutes());
};

export default routes;
