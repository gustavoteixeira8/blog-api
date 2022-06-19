import { logger } from '@shared/log';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import {
  StorageOptions,
  StorageAdapterProtocol,
} from '@shared/adapters/storageAdapter/StorageAdapterProtocol';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProcessStorageQueueService {
  constructor(
    @inject('StorageAdapter')
    private readonly _storageAdapter: StorageAdapterProtocol,
    @inject('StorageQueueAdapter')
    private readonly _storageQueueAdapter: QueueAdapterProtocol<StorageOptions>,
  ) {}

  public execute(): void {
    this._storageQueueAdapter.process(async (job) => {
      try {
        const { action, filetype, filename } = job.data;

        if (action === 'SAVE') {
          await this._storageAdapter.save(filename, filetype);
          logger.info('File uploaded successfully');
        } else if (action === 'DELETE') {
          await this._storageAdapter.delete(filename, filetype);
          logger.info('File deleted successfully');
        }
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
