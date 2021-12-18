import Bull, { Queue, QueueOptions } from 'bull';
import { CallbackQueueProcess, QueueProviderProtocol } from '../QueueProviderProtocol';

export class BullQueueProvider<T> implements QueueProviderProtocol<T> {
  private readonly _queue: Queue;

  constructor(queueName: string, queueOptions: QueueOptions) {
    this._queue = new Bull<T>(queueName, queueOptions);
  }

  public async add(data: T | T[]): Promise<void> {
    if (Array.isArray(data)) {
      data.map(async (jobData) => await this._queue.add(jobData));

      return;
    }

    await this._queue.add(data);
  }

  public async process(callback: CallbackQueueProcess<T>): Promise<void> {
    await this._queue.process(callback);
  }
}
