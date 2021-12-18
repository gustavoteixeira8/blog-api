import { Identifier } from './valueObjects/Identifier';

export interface EntityProtocol {
  readonly id?: Identifier;
  [key: string]: any;
}

export abstract class Entity<T extends EntityProtocol> implements EntityProtocol {
  protected readonly _id: Identifier;

  get id(): Identifier {
    return this._id;
  }

  constructor(props: T) {
    this._id = props.id || Identifier.create();
  }

  public equals(object: Entity<T>): boolean {
    if (object === null || object === undefined) return false;

    if (this !== object) return false;

    if (this._id !== object.id) return false;

    return true;
  }
}
