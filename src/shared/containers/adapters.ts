import { container } from 'tsyringe';
import { queueConfig } from '@config/queue';
import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { BCryptAdapter } from '@shared/adapters/hashAdapter/implementations/BCryptAdapter';
import {
  MailOptionsProtocol,
  MailAdapterProtocol,
} from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { BullQueueAdapter } from '@shared/adapters/queueAdapter/implementations/BullQueueAdapter';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { HandlebarsAdapter } from '@shared/adapters/templateAdapter/implementations/HandlebarsAdapter';
import { TemplateAdapterProtocol } from '@shared/adapters/templateAdapter/TemplateAdapterProtocol';
import { JsonWebTokenAdapter } from '@shared/adapters/tokenAdapter/implementations/JsonWebTokenAdapter';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { DateFnsAdapter } from '@shared/adapters/dateAdapter/implementations/DateFnsAdapter';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { SlugifyAdapter } from '@shared/adapters/slugAdapter/implementations/SlugifyAdapter';
import {
  StorageOptions,
  StorageAdapterProtocol,
} from '@shared/adapters/storageAdapter/StorageAdapterProtocol';
import { ProcessImageAdapterProtocol } from '@shared/adapters/processImageAdapter/ProcessImageAdapterProtocol';
import { SharpAdapter } from '@shared/adapters/processImageAdapter/implementations/SharpAdapter';
import { CloudinaryStorageAdapter } from '@shared/adapters/storageAdapter/implementations/CloudinaryStorageAdapter';
import { SendGridMailAdapter } from '@shared/adapters/mailAdapter/implementations/SendGridMailAdapter';
import { SanitizeHtmlAdapter } from '@shared/adapters/sanitizerAdapter/implementations/SanitizeHtmlAdapter';
import { SanitizerAdapterProtocol } from '@shared/adapters/sanitizerAdapter/SanitizerAdapterProtocol';

container.registerSingleton<HashAdapterProtocol>('HashAdapter', BCryptAdapter);
container.registerSingleton<TokenAdapterProtocol>('TokenAdapter', JsonWebTokenAdapter);
container.registerSingleton<MailAdapterProtocol>('MailAdapter', SendGridMailAdapter);
container.registerSingleton<TemplateAdapterProtocol>('TemplateAdapter', HandlebarsAdapter);
container.registerSingleton<DateAdapterProtocol>('DateAdapter', DateFnsAdapter);
container.registerSingleton<SlugAdapterProtocol>('SlugAdapter', SlugifyAdapter);
container.registerSingleton<StorageAdapterProtocol>('StorageAdapter', CloudinaryStorageAdapter);
container.registerSingleton<ProcessImageAdapterProtocol>(
  'ProcessImageAdapterProtocol',
  SharpAdapter,
);
container.registerSingleton<SanitizerAdapterProtocol>('SanitizerAdapter', SanitizeHtmlAdapter);
container.registerInstance<QueueAdapterProtocol<MailOptionsProtocol>>(
  'MailQueueAdapter',
  new BullQueueAdapter('mail-queue', queueConfig.mailQueue),
);
container.registerInstance<QueueAdapterProtocol<StorageOptions>>(
  'StorageQueueAdapter',
  new BullQueueAdapter('storage-queue', queueConfig.storageQueue),
);
