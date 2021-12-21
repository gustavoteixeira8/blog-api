import 'reflect-metadata';
import 'dotenv/config';
import '@shared/containers';
import { container } from 'tsyringe';
import { ProcessMailQueueService } from './services/ProcessMailQueueService';
import { ProcessStorageQueueService } from './services/ProcessStorageQueueService';
import { logger } from '@shared/log';

export enum ExitStatus {
  success = 0,
  error = 1,
}

process.on('uncaughtException', (error) => {
  logger.error(`Queue exited with error -> `, error);
  process.exit(ExitStatus.error);
});

process.on('unhandledRejection', (error) => {
  logger.error(`Queue exited with error -> `, error);
  process.exit(ExitStatus.error);
});

(function () {
  try {
    const processMailQueueService = container.resolve(ProcessMailQueueService);
    const processStorageQueueService = container.resolve(ProcessStorageQueueService);

    processMailQueueService.execute();
    processStorageQueueService.execute();

    const quitSignal: NodeJS.Signals[] = ['SIGQUIT', 'SIGTERM', 'SIGINT'];

    quitSignal.forEach((signal) => {
      process.on(signal, async () => {
        try {
          logger.info(`Queue exited with success`);
          process.exit(ExitStatus.success);
        } catch (error) {
          logger.error('Queue exited with error ->', error);
          process.exit(ExitStatus.error);
        }
      });
    });

    logger.info('Running queue');
  } catch (error) {
    logger.error('Queue exited with error -> ', error);
  }
})();
