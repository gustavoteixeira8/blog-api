import { ProcessPromiseFunction } from 'bull';

export type CallbackQueueProcess<T> = ProcessPromiseFunction<T>;

export interface QueueAdapterProtocol<T> {
  add(data: T | T[]): Promise<void>;
  process(callback: CallbackQueueProcess<T>): Promise<void>;
}
