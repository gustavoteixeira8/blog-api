import { logger } from '@shared/log';
import cron from 'node-cron';
import { container } from 'tsyringe';
import { DeleteAllArticlesUseCase } from '../useCases/DeleteAllArticlesUseCase';

cron.schedule('0 0 2 * * *', async () => {
  try {
    const deleteArticles = container.resolve(DeleteAllArticlesUseCase);

    await deleteArticles.execute();

    logger.info('Schedule to delete articles executed successfully');
  } catch (error) {
    logger.error(error);
  }
});
