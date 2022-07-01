import { makeStorageQueueAdapter } from '@shared/adapters/queueAdapter/makeStorageQueueAdapter';
import { makeStorageAdapter } from '@shared/adapters/storageAdapter/makeStorageAdapter';
import { ProcessStorageQueueService } from './ProcessStorageQueueService';

export const makeProcessStorageQueue = () => {
  const storageQueueAdapter = makeStorageQueueAdapter();
  const storageAdapter = makeStorageAdapter();
  return new ProcessStorageQueueService(storageAdapter, storageQueueAdapter);
};
