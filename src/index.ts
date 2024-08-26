import createApp from './app';
import { logger } from './services';
const app = createApp();

app.listen(app.get('port'), () => {
  logger.info(`Server is running at http://localhost:${app.get('port')}`);
});
