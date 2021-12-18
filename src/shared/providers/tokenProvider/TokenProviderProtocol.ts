export type TokenPayloadProtocol = Record<string, any>;

export interface TokenOptionsProtocol {
  expiresIn?: string | number;
}

export interface TokenProviderProtocol {
  sign(payload: TokenPayloadProtocol, options?: TokenOptionsProtocol): string;
  verify(token: string): TokenPayloadProtocol;
}
