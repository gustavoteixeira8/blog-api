export interface Auth {
  userId: string;
  accessToken: string;
  expiresIn: Date;
}

export interface RedisAuthStorageProtocol {
  saveToken(authRequest: Auth): Promise<void>;
  deleteToken(userId: string): Promise<void>;
  getToken(userId: string): Promise<Auth | undefined>;
}
