import { ValueObjectProtocol } from './ValueObjectProtocol';
import { InvalidTokenError } from '@shared/core/errors';
import { makeUuidAdapter } from '@shared/adapters/uuidAdapter/makeUuidAdapter';

export class TokenSpecific extends ValueObjectProtocol<string> {
  private static _uuidAdapter = makeUuidAdapter();

  public static create(token?: string): TokenSpecific | InvalidTokenError {
    return new TokenSpecific(token || this.generate());
  }

  private static generate(): string {
    return `${Date.now()}-${this._uuidAdapter.generate()}`;
  }
}
