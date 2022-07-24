import Redis, { RedisOptions, Redis as RedisClient } from 'ioredis';

export class RedisProvider {
  private _client: RedisClient;
  private static _instance: RedisProvider | null = null;

  get client(): RedisClient {
    return this._client;
  }

  private constructor(options: RedisOptions) {
    this._client = new Redis(options);
  }

  public static connect(options: RedisOptions): RedisProvider {
    if (!this._instance) {
      this._instance = new RedisProvider(options);
      this._instance.defineEvents();
    }
    return this._instance;
  }

  public disconnect(reconnect = false): void {
    if (this._client) {
      this._client.disconnect(reconnect);
      RedisProvider._instance = null;
    }
  }

  private defineEvents(): void {
    if (this._client) {
      this._client.on('error', (error) => {
        this.disconnect(false);
        throw new Error(error);
      });
    }
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this._client.set(key, JSON.stringify(value));
  }

  public async delete(key: string): Promise<void> {
    await this._client.del(key);
  }

  public async get<T = any>(key: string): Promise<T | undefined> {
    const value = await this._client.get(key);

    if (!value) return;

    return JSON.parse(value) as T;
  }
}
