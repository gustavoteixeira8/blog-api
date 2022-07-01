import { logger } from '@shared/log';
import {
  MailOptionsProtocol,
  MailAdapterProtocol,
} from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProcessMailQueueService {
  constructor(
    @inject('MailAdapter')
    private readonly _mailAdapter: MailAdapterProtocol,
    @inject('MailQueueAdapter')
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public execute(): void {
    this._mailQueueAdapter.process(async (job) => {
      try {
        const mailOptions = job.data;

        await this._mailAdapter.sendMail(mailOptions);

        logger.info(`Email sent to ${mailOptions.to.address}`);
      } catch (error) {
        logger.error(error);
      }
    });
  }
}
