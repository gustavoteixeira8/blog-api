import { appConfig } from '@config/app';
import { mailConfig } from '@config/mail';
import * as Brevo from '@getbrevo/brevo';
import { logger } from '@shared/log';
import {
  AddressOptionsProtocol,
  MailOptionsProtocol,
  MailAdapterProtocol,
} from '../MailAdapterProtocol';
import { TemplateAdapterProtocol } from '@shared/adapters/templateAdapter/TemplateAdapterProtocol';

export class BrevoMailAdapter implements MailAdapterProtocol {
  private readonly _apiKey = mailConfig.brevo.apiKey;
  private readonly _appAddress: AddressOptionsProtocol = appConfig.mail;

  private _apiInstance: Brevo.TransactionalEmailsApi;

  constructor(private _templateAdapter: TemplateAdapterProtocol) {
    this._apiInstance = new Brevo.TransactionalEmailsApi();
    this._apiInstance.setApiKey(0, this._apiKey);
  }

  public async sendMail(options: MailOptionsProtocol): Promise<void> {
    try {
      const htmlParsed = await this._templateAdapter.parse({
        file: options.html,
        variables: options.context,
      });

      const mailConfig: Brevo.SendSmtpEmail = {
        sender: {
          email: options.from?.address || this._appAddress.address,
          name: options.from?.name || this._appAddress.name,
        },
        to: [
          {
            email: options.to.address,
            name: options.to.name,
          },
        ],
        subject: options.subject,
        htmlContent: htmlParsed,
        attachment: options.attachments?.map((a) => ({
          content: a.content,
          filename: a.filename,
          type: a.contentType,
        })),
        replyTo: {
          email:  options.replyTo || this._appAddress.address,
          name: options.from?.name || this._appAddress.name,
        }
      };

      await this._apiInstance.sendTransacEmail(mailConfig);
    } catch (error) {
      logger.error(error);
      throw new Error('Mail service error');
    }
  }
}
