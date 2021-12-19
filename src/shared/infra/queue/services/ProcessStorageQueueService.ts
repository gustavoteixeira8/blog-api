import { logger } from '@shared/log';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import {
  StorageOptions,
  StorageProviderProtocol,
} from '@shared/providers/storageProvider/StorageProviderProtocol';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProcessStorageQueueService {
  constructor(
    @inject('StorageProvider')
    private readonly _storageProvider: StorageProviderProtocol,
    @inject('StorageQueueProvider')
    private readonly _storageQueueProvider: QueueProviderProtocol<StorageOptions>,
  ) {}

  public execute(): void {
    this._storageQueueProvider.process(async (job) => {
      try {
        const { action, filetype, filename } = job.data;

        if (action === 'SAVE') {
          await this._storageProvider.save(filename, filetype);
          logger.info('File uploaded successfully');
        } else if (action === 'DELETE') {
          await this._storageProvider.delete(filename, filetype);
          logger.info('File deleted successfully');
        }
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
