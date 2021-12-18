import { InvalidPasswordError } from '@shared/core/errors';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Password extends ValueObjectProtocol<string> {
  protected constructor(value: string, private _isHash = false) {
    super(value);
  }

  get isHash(): boolean {
    return this._isHash;
  }

  public static create(password: string, isHash = false): Password | InvalidPasswordError {
    if (!this.validate(password, isHash)) {
      return new InvalidPasswordError();
    }

    return new Password(password, isHash);
  }

  public static validate(password: string, isHash = false): boolean {
    if (isHash) return true;

    return isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  }
}
