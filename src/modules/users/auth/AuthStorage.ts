import { RedisProvider } from '@shared/infra/cache';

export interface Auth {
  userId: string;
  accessToken: string;
  expiresIn: Date;
}

export class AuthStorage {
  constructor(private _cacheProvider: RedisProvider) {}

  public async saveToken({ userId, accessToken, expiresIn }: Auth): Promise<void> {
    const key = this.constructKey(userId);

    await this._cacheProvider.save(key, { userId, accessToken, expiresIn });
  }

  public async deleteToken(userId: string) {
    const key = this.constructKey(userId);

    await this._cacheProvider.delete(key);
  }

  public async getToken(userId: string) {
    return await this._cacheProvider.get<Auth>(this.constructKey(userId));
  }

  private constructKey(userId: string) {
    return `authService:${userId}`;
  }
}
