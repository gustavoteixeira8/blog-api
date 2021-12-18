import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import {
  TokenOptionsProtocol,
  TokenPayloadProtocol,
  TokenProviderProtocol,
} from '../TokenProviderProtocol';

export class JsonWebTokenProvider implements TokenProviderProtocol {
  private readonly jwtConfig = authConfig.jwt;

  public sign(payload: TokenPayloadProtocol, options?: TokenOptionsProtocol): string {
    return jwtSign(payload, this.jwtConfig.secretKey, options);
  }

  public verify(token: string): TokenPayloadProtocol {
    return jwtVerify(token, this.jwtConfig.secretKey) as TokenPayloadProtocol;
  }
}
