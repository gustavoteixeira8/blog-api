import { v4 as uuidV4 } from 'uuid';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Identifier extends ValueObjectProtocol<string> {
  public static create(id?: string): Identifier {
    return new Identifier(id || uuidV4());
  }
}
