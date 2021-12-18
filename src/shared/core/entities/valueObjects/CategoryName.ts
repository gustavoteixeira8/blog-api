import { InvalidCategoryNameError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class CategoryName extends ValueObjectProtocol<string> {
  public static create(name: string): CategoryName | InvalidCategoryNameError {
    const nameFormatted = this.format(name);

    if (!this.validate(name)) {
      return new InvalidCategoryNameError(nameFormatted);
    }

    return new CategoryName(nameFormatted);
  }

  public static format(name: string): string {
    return name.trim();
  }

  public static validate(name: string): boolean {
    if (typeof name !== 'string') return false;

    const nameTrim = name.trim();
    const checkLength = nameTrim.length >= 3 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(name);

    return checkLength && alphanumericAndNonAlphanumeric;
  }
}
