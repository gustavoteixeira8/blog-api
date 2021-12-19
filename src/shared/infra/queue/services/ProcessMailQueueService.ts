import { logger } from '@shared/log';
import {
  MailOptionsProtocol,
  MailProviderProtocol,
} from '@shared/providers/mailProvider/MailProvider';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProcessMailQueueService {
  constructor(
    @inject('MailProvider')
    private readonly _mailProvider: MailProviderProtocol,
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public execute(): void {
    this._mailQueueProvider.process(async (job) => {
      try {
        const mailOptions = job.data;

        await this._mailProvider.sendMail(mailOptions);

        logger.info(`Email sent to`, mailOptions.to);
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
