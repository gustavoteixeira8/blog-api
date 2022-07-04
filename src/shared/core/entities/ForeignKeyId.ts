import { InvalidForeignKeyError } from '@shared/core/errors';
import isUUID from 'validator/lib/isUUID';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class ForeignKeyId extends ValueObjectProtocol<string> {
  public static create(id: string): ForeignKeyId | InvalidForeignKeyError {
    if (!this.validate(id)) {
      return new InvalidForeignKeyError();
    }

    return new ForeignKeyId(id);
  }

  public static validate(id: string): boolean {
    return isUUID(id, 'all');
  }
}
