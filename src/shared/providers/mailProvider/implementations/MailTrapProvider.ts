import nodemailer from 'nodemailer';
import { mailConfig } from '@config/mail';
import { AddressOptionsProtocol, MailOptionsProtocol, MailProviderProtocol } from '../MailProvider';
import { HandlebarsProvider } from '@shared/providers/templateProvider/implementations/HandlebarsProvider';
import { appConfig } from '@config/app';

export class MailTrapProvider implements MailProviderProtocol {
  private readonly _mailerConfig: Record<string, any> = mailConfig.mailtrap;
  private readonly _appAddress: AddressOptionsProtocol = appConfig.mail;

  async sendMail(options: MailOptionsProtocol): Promise<void> {
    const transporter = nodemailer.createTransport(this._mailerConfig);

    try {
      const handlebars = new HandlebarsProvider();
      const htmlParsed = await handlebars.parse({
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
      throw new Error('Mail service error');
    } finally {
      transporter.close();
    }
  }
}
