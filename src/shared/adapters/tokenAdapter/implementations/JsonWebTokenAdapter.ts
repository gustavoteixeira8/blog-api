import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import {
  TokenOptionsProtocol,
  TokenPayloadProtocol,
  TokenAdapterProtocol,
} from '../TokenAdapterProtocol';

export class JsonWebTokenAdapter implements TokenAdapterProtocol {
  private readonly jwtConfig = authConfig.jwt;

  public sign(payload: TokenPayloadProtocol, options?: TokenOptionsProtocol): string {
    return jwtSign(payload, this.jwtConfig.secretKey, options);
  }

  public verify(token: string): TokenPayloadProtocol {
    return jwtVerify(token, this.jwtConfig.secretKey) as TokenPayloadProtocol;
  }
}
