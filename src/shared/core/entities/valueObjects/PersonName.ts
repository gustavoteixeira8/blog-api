import { InvalidFullNameError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class PersonName extends ValueObjectProtocol<string> {
  public static create(name: string): PersonName | InvalidFullNameError {
    if (!this.validate(name)) {
      return new InvalidFullNameError();
    }

    const nameFormatted = this.format(name);

    return new PersonName(nameFormatted);
  }

  public static format(name: string): string {
    const nameSplitted = name.toLowerCase().trim().split(' ');

    for (const i in nameSplitted) {
      const nameFormatted = nameSplitted[i][0].toUpperCase() + nameSplitted[i].substring(1);

      nameSplitted[i] = nameFormatted;
    }

    return nameSplitted.join(' ');
  }

  public static validate(name: string): boolean {
    if (typeof name !== 'string') return false;

    const nameTrim = name.trim();
    const checkLength = nameTrim.length > 1 && nameTrim.length < 255;
    const mustHaveCharUpperAndLowerCase = /^[a-zá-ýA-ZÁ-Ý ]+$/.test(name);

    return checkLength && mustHaveCharUpperAndLowerCase;
  }
}
