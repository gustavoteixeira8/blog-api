import { queueConfig } from '@config/queue';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { BullQueueAdapter } from '@shared/adapters/queueAdapter/implementations/BullQueueAdapter';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';

export const makeMailQueueAdapter = (): QueueAdapterProtocol<MailOptionsProtocol> => {
  return new BullQueueAdapter('mail-queue', queueConfig.mailQueue);
};
