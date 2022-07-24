import { RedisProvider } from '@shared/infra/cache';
import { Auth, RedisAuthStorageProtocol } from '../RedisAuthStorageProtocol';

export class RedisAuthStorage implements RedisAuthStorageProtocol {
  constructor(private _cacheProvider: RedisProvider) {}

  public async saveToken({ userId, accessToken, expiresIn }: Auth): Promise<void> {
    const key = this.constructKey(userId);

    await this._cacheProvider.save(key, { userId, accessToken, expiresIn });
  }

  public async deleteToken(userId: string): Promise<void> {
    const key = this.constructKey(userId);

    await this._cacheProvider.delete(key);
  }

  public async getToken(userId: string): Promise<Auth | undefined> {
    const key = this.constructKey(userId);
    return await this._cacheProvider.get<Auth>(key);
  }

  private constructKey(userId: string): string {
    return `authService:${userId}`;
  }
}
