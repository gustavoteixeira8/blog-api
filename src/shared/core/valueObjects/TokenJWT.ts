import isJWT from 'validator/lib/isJWT';
import { ValueObjectProtocol } from './ValueObjectProtocol';
import { InvalidTokenError } from '@shared/core/errors';

export class TokenJWT extends ValueObjectProtocol<string> {
  public static create(token: string): TokenJWT | InvalidTokenError {
    if (!this.validate(token)) {
      return new InvalidTokenError();
    }

    return new TokenJWT(token);
  }

  public static validate(token: string): boolean {
    return isJWT(token);
  }
}
