import { makeMailAdapter } from '@shared/adapters/mailAdapter/makeMailAdapter';
import { makeMailQueueAdapter } from '@shared/adapters/queueAdapter/makeMailQueueAdapter';
import { ProcessMailQueueService } from './ProcessMailQueueService';

export const makeProcessMailQueue = () => {
  const mailQueueAdapter = makeMailQueueAdapter();
  const mailAdapter = makeMailAdapter();
  return new ProcessMailQueueService(mailAdapter, mailQueueAdapter);
};
