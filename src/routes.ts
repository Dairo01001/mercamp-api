import { Application } from 'express';
import { userRoutes } from './user';

const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/api/user', userRoutes());
};

export default routes;
