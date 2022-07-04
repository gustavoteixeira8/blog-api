export abstract class ValueObjectProtocol<T> {
  protected constructor(protected readonly _value: T) {}

  get value(): T {
    return this._value;
  }

  public equals(object: ValueObjectProtocol<T>): boolean {
    if (object === null || object === undefined) return false;

    if (this._value === undefined) return false;

    if (JSON.stringify(object.value) !== JSON.stringify(this._value)) return false;

    return true;
  }
}
