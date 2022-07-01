import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/containers';
import { Server } from './server';
import { logger } from '@shared/log';

export enum ExitStatus {
  success = 0,
  error = 1,
}

process.on('uncaughtException', (error) => {
  logger.error(`App exited with error -> ${error}`);
  process.exit(ExitStatus.error);
});

process.on('unhandledRejection', (error) => {
  logger.error(`App exited with error -> ${error}`);
  process.exit(ExitStatus.error);
});

(async function () {
  try {
    const server = Server.instance;

    await server.start();

    const quitSignal: NodeJS.Signals[] = ['SIGQUIT', 'SIGTERM', 'SIGINT'];

    quitSignal.forEach((signal) => {
      process.on(signal, async () => {
        try {
          await server.close();
          logger.info(`App exited with success`);
          process.exit(ExitStatus.success);
        } catch (error) {
          logger.error(`App exited with error -> ${error}`);
          process.exit(ExitStatus.error);
        }
      });
    });
  } catch (error) {
    logger.error(`App exited with error -> ${error}`);
    process.exit(ExitStatus.error);
  }
})();
