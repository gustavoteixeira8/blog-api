import { logger } from '@shared/log';
import cron from 'node-cron';
import { makeDeleteAllUsers } from '../useCases/deleteAllUsers/makeDeleteAllUsers';

cron.schedule('59 59 23 * * *', async () => {
  try {
    const deleteUsersUseCase = makeDeleteAllUsers();

    await deleteUsersUseCase.execute();

    logger.info('Schedule to delete users executed successfully');
  } catch (error) {
    logger.error(error);
  }
});
