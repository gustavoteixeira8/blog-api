import 'reflect-metadata';
import 'dotenv/config';
import '@shared/containers';
import { container } from 'tsyringe';
import { ProcessMailQueueService } from './services/ProcessMailQueueService';
import { ProcessStorageQueueService } from './services/ProcessStorageQueueService';

export enum ExitStatus {
  success = 0,
  error = 1,
}

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
          console.log(`Queue exited with success`);
          process.exit(ExitStatus.success);
        } catch (error) {
          console.log(`Queue exited with error -> ${error}`);
          process.exit(ExitStatus.error);
        }
      });
    });

    console.log('Running queue');
  } catch (error) {
    console.log(error);
  }
})();
