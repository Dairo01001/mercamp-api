import createApp from './app';
import { logger } from './shared';
const app = createApp();

app.listen(app.get('port'), () => {
  logger.info(`Server is running at http://localhost:${app.get('port')}`);
});
