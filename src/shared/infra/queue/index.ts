import 'reflect-metadata';
import 'dotenv/config';
import { logger } from '@shared/log';
import { makeProcessMailQueue } from './services/processMailQueue/makeProcessMailQueue';
import { makeProcessStorageQueue } from './services/processStorageQueue/makeProcessStorageQueue';

export enum ExitStatus {
  success = 0,
  error = 1,
}

process.on('uncaughtException', (error) => {
  logger.error(`Queue exited with error -> ${error}`);
  process.exit(ExitStatus.error);
});

process.on('unhandledRejection', (error) => {
  logger.error(`Queue exited with error -> ${error}`);
  process.exit(ExitStatus.error);
});

(async function () {
  try {
    const processMailQueueService = makeProcessMailQueue();
    const processStorageQueueService = makeProcessStorageQueue();

    processMailQueueService.execute();
    processStorageQueueService.execute();

    const quitSignal: NodeJS.Signals[] = ['SIGQUIT', 'SIGTERM', 'SIGINT'];

    quitSignal.forEach((signal) => {
      process.on(signal, async () => {
        try {
          logger.info(`Queue exited with success`);
          process.exit(ExitStatus.success);
        } catch (error) {
          logger.error(`Queue exited with error -> ${error}`);
          process.exit(ExitStatus.error);
        }
      });
    });

    logger.info('Running queue');
  } catch (error) {
    logger.error(`Queue exited with error -> ${error}`);
  }
})();
