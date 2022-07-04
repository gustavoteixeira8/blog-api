import { InvalidSlugError } from '@shared/core/errors';
import isSlug from 'validator/lib/isSlug';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class Slug extends ValueObjectProtocol<string> {
  public static create(slug: string): Slug | InvalidSlugError {
    if (!this.validate(slug)) {
      return new InvalidSlugError();
    }

    return new Slug(slug);
  }

  public static validate(slug: string): boolean {
    return isSlug(slug);
  }
}
