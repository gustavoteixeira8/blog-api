import { InvalidEmailError } from '@shared/core/errors';
import isEmail from 'validator/lib/isEmail';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Email extends ValueObjectProtocol<string> {
  public static create(email: string): Email | InvalidEmailError {
    if (!this.validate(email)) {
      return new InvalidEmailError();
    }

    const emailFormatted = this.format(email);

    return new Email(emailFormatted);
  }

  public static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static validate(email: string): boolean {
    return isEmail(email);
  }
}
