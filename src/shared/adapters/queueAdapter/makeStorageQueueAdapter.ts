import { queueConfig } from '@config/queue';
import { StorageOptions } from '../storageAdapter/StorageAdapterProtocol';
import { BullQueueAdapter } from './implementations/BullQueueAdapter';

export const makeStorageQueueAdapter = (): BullQueueAdapter<StorageOptions> => {
  return new BullQueueAdapter('storage-queue', queueConfig.storageQueue);
};
