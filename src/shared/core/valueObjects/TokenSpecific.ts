import { ValueObjectProtocol } from './ValueObjectProtocol';
import { InvalidTokenError } from '@shared/core/errors';

export class TokenSpecific extends ValueObjectProtocol<string> {
  public static create(token?: string): TokenSpecific | InvalidTokenError {
    return new TokenSpecific(token || this.generate());
  }

  private static generate(): string {
    return `${Date.now()}${Math.random().toString(36).slice(2)}`;
  }
}
