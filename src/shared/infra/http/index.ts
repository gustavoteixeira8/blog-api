import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '@shared/containers';
import '@modules/users/events/deleteUsers';
import { Server } from './server';

export enum ExitStatus {
  success = 0,
  error = 1,
}

process.on('uncaughtException', (error) => {
  console.log(`App exited with error -> `, error);
  process.exit(ExitStatus.error);
});

process.on('unhandledRejection', (error) => {
  console.log(`App exited with error -> `, error);
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
          console.log(`App exited with success`);
          process.exit(ExitStatus.success);
        } catch (error) {
          console.log(`App exited with error -> ${error}`);
          process.exit(ExitStatus.error);
        }
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(ExitStatus.error);
  }
})();
