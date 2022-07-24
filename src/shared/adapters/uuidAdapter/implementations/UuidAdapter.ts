import { v4 as uuid } from 'uuid';
import { UuidAdapterProtocol } from '../UuidAdapterProtocol';

export class UuidAdapter implements UuidAdapterProtocol {
  public generate(): string {
    return uuid();
  }
}
