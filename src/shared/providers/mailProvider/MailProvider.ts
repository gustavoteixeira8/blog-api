import { FileTemplateProtocol } from '../templateProvider/TemplateProviderProtocol';

export interface Attachments {
  filename: string;
  content: string;
  path: string;
  href?: string;
  encoding?: string;
  contentType?: string;
}

export interface AddressOptionsProtocol {
  name: string;
  address: string;
}

export interface MailOptionsProtocol {
  from?: AddressOptionsProtocol;
  to: AddressOptionsProtocol;
  subject: string;
  html: FileTemplateProtocol;
  context?: Record<string, any>;
  attachments?: Attachments[];
  replyTo?: string;
}

export interface MailProviderProtocol {
  sendMail(options: MailOptionsProtocol): Promise<void>;
}
