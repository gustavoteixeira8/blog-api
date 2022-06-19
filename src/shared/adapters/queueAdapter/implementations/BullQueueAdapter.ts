import Bull, { Queue, QueueOptions } from 'bull';
import { CallbackQueueProcess, QueueAdapterProtocol } from '../QueueAdapterProtocol';

export class BullQueueAdapter<T> implements QueueAdapterProtocol<T> {
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
