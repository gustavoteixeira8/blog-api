import { makeUuidAdapter } from '@shared/adapters/uuidAdapter/makeUuidAdapter';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Identifier extends ValueObjectProtocol<string> {
  public static create(id?: string): Identifier {
    const uuidAdapter = makeUuidAdapter();

    return new Identifier(id || uuidAdapter.generate());
  }
}
