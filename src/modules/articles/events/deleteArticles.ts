import { logger } from '@shared/log';
import cron from 'node-cron';
import { makeDeleteAllArticles } from '../useCases/deleteAllArticles/makeDeleteAllArticles';

cron.schedule('0 0 2 * * *', async () => {
  try {
    const deleteArticles = makeDeleteAllArticles();

    await deleteArticles.execute();

    logger.info('Schedule to delete articles executed successfully');
  } catch (error) {
    logger.error(error);
  }
});
