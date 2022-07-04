import nodemailer from 'nodemailer';
import { mailConfig } from '@config/mail';
import {
  AddressOptionsProtocol,
  MailOptionsProtocol,
  MailAdapterProtocol,
} from '../MailAdapterProtocol';
import { appConfig } from '@config/app';
import { logger } from '@shared/log';
import { TemplateAdapterProtocol } from '@shared/adapters/templateAdapter/TemplateAdapterProtocol';

export class MailTrapAdapter implements MailAdapterProtocol {
  private readonly _mailerConfig: Record<string, any> = mailConfig.mailtrap;
  private readonly _appAddress: AddressOptionsProtocol = appConfig.mail;

  constructor(private _templateAdapter: TemplateAdapterProtocol) {}

  async sendMail(options: MailOptionsProtocol): Promise<void> {
    const transporter = nodemailer.createTransport(this._mailerConfig);

    try {
      const htmlParsed = await this._templateAdapter.parse({
        file: options.html,
        variables: options.context,
      });

      await transporter.sendMail({
        from: options.from || this._appAddress,
        to: options.to,
        subject: options.subject,
        html: htmlParsed,
        attachments: options.attachments,
        replyTo: options.replyTo,
      });
    } catch (error) {
      logger.error(error);
      throw new Error('Mail service error');
    }
  }
}
