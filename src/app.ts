import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes';
import { ORIGIN, PORT } from './config';
import { unkanowEndpoint } from './middlewares';

const createApp = () => {
  const app: Application = express();
  app.set('port', PORT);
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use(
    cors({
      origin: ORIGIN,
      credentials: true,
    }),
  );
  routes(app);
  app.use(unkanowEndpoint);

  return app;
};

export default createApp;
