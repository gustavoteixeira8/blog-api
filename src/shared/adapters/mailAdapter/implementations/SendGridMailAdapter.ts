import { appConfig } from '@config/app';
import { mailConfig } from '@config/mail';
import sendGrid from '@sendgrid/mail';
import { logger } from '@shared/log';
import {
  AddressOptionsProtocol,
  MailOptionsProtocol,
  MailAdapterProtocol,
} from '../MailAdapterProtocol';
import { TemplateAdapterProtocol } from '@shared/adapters/templateAdapter/TemplateAdapterProtocol';

export class SendGridMailAdapter implements MailAdapterProtocol {
  private readonly _apiKey = mailConfig.sendGrid.apiKey;
  private readonly _appAddress: AddressOptionsProtocol = appConfig.mail;

  constructor(private _templateAdapter: TemplateAdapterProtocol) {
    sendGrid.setApiKey(this._apiKey);
  }

  public async sendMail(options: MailOptionsProtocol): Promise<void> {
    try {
      const htmlParsed = await this._templateAdapter.parse({
        file: options.html,
        variables: options.context,
      });

      await sendGrid.send({
        from: {
          email: options.from?.address || this._appAddress.address,
          name: options.from?.name || this._appAddress.name,
        },
        to: {
          email: options.to.address,
          name: options.to.name,
        },
        subject: options.subject,
        html: htmlParsed,
        attachments: options.attachments?.map((a) => ({
          content: a.content,
          filename: a.filename,
          type: a.contentType,
        })),
        replyTo: options.replyTo || this._appAddress.address,
      });
    } catch (error) {
      logger.error(error);
      throw new Error('Mail service error');
    }
  }
}
