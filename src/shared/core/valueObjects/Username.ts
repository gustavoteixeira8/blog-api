import { InvalidUsernameError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Username extends ValueObjectProtocol<string> {
  public static create(username: string): Username | InvalidUsernameError {
    if (!this.validate(username)) {
      return new InvalidUsernameError();
    }

    const usernameFormatted = this.format(username);

    return new Username(usernameFormatted);
  }

  public static format(username: string): string {
    return username.split(' ').join('').trim();
  }

  public static validate(username: string): boolean {
    if (typeof username !== 'string') return false;

    const nameTrim = username.trim();
    const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(username);
    const notExistsSpace = nameTrim.split(' ').length <= 1;

    return checkLength && alphanumericAndNonAlphanumeric && notExistsSpace;
  }
}
