import { appConfig } from '@config/app';
import { mailConfig } from '@config/mail';
import sendGrid from '@sendgrid/mail';
import { logger } from '@shared/log';
import { HandlebarsProvider } from '@shared/providers/templateProvider/implementations/HandlebarsProvider';
import { AddressOptionsProtocol, MailOptionsProtocol, MailProviderProtocol } from '../MailProvider';

export class SendGridMailProvider implements MailProviderProtocol {
  private readonly _apiKey = mailConfig.sendGrid.apiKey;
  private readonly _appAddress: AddressOptionsProtocol = appConfig.mail;

  constructor() {
    sendGrid.setApiKey(this._apiKey);
  }

  public async sendMail(options: MailOptionsProtocol): Promise<void> {
    try {
      const handlebars = new HandlebarsProvider();
      const htmlParsed = await handlebars.parse({
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
