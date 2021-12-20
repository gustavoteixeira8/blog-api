import { container } from 'tsyringe';
import { queueConfig } from '@config/queue';
import { HashProviderProtocol } from '@shared/providers/hashProvider/HashProviderProtocol';
import { BCryptProvider } from '@shared/providers/hashProvider/implementations/BCryptProvider';
import {
  MailOptionsProtocol,
  MailProviderProtocol,
} from '@shared/providers/mailProvider/MailProvider';
import { BullQueueProvider } from '@shared/providers/queueProvider/implementations/BullQueueProvider';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { HandlebarsProvider } from '@shared/providers/templateProvider/implementations/HandlebarsProvider';
import { TemplateProviderProtocol } from '@shared/providers/templateProvider/TemplateProviderProtocol';
import { JsonWebTokenProvider } from '@shared/providers/tokenProvider/implementations/JsonWebTokenProvider';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { DateProviderProtocol } from '@shared/providers/dateProvider/DateProviderProtocol';
import { DateFnsProvider } from '@shared/providers/dateProvider/implementations/DateFnsProvider';
import { SlugProviderProtocol } from '@shared/providers/slugProvider/SlugProviderProtocol';
import { SlugifyProvider } from '@shared/providers/slugProvider/implementations/SlugifyProvider';
import {
  StorageOptions,
  StorageProviderProtocol,
} from '@shared/providers/storageProvider/StorageProviderProtocol';
import { ProcessImageProvider } from '@shared/providers/processImageProvider/ProcessImageProvider';
import { SharpProvider } from '@shared/providers/processImageProvider/implementations/SharpProvider';
import { CloudinaryStorageProvider } from '@shared/providers/storageProvider/implementations/CloudinaryStorageProvider';
import { SendGridMailProvider } from '@shared/providers/mailProvider/implementations/SendGridMailProvider';

container.registerSingleton<HashProviderProtocol>('HashProvider', BCryptProvider);
container.registerSingleton<TokenProviderProtocol>('TokenProvider', JsonWebTokenProvider);
container.registerSingleton<MailProviderProtocol>('MailProvider', SendGridMailProvider);
container.registerSingleton<TemplateProviderProtocol>('TemplateProvider', HandlebarsProvider);
container.registerSingleton<DateProviderProtocol>('DateProvider', DateFnsProvider);
container.registerSingleton<SlugProviderProtocol>('SlugProvider', SlugifyProvider);
container.registerSingleton<StorageProviderProtocol>('StorageProvider', CloudinaryStorageProvider);
container.registerSingleton<ProcessImageProvider>('ProcessImageProvider', SharpProvider);
container.registerInstance<QueueProviderProtocol<MailOptionsProtocol>>(
  'MailQueueProvider',
  new BullQueueProvider('mail-queue', queueConfig.mailQueue),
);
container.registerInstance<QueueProviderProtocol<StorageOptions>>(
  'StorageQueueProvider',
  new BullQueueProvider('storage-queue', queueConfig.storageQueue),
);
