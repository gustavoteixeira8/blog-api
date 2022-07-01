import { queueConfig } from '@config/queue';
import { BullQueueAdapter } from './implementations/BullQueueAdapter';

export const makeStorageQueueAdapter = () => {
  return new BullQueueAdapter('storage-queue', queueConfig.storageQueue);
};
