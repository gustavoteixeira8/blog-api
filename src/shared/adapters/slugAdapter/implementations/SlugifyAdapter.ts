import slugify from 'slugify';
import { SlugOptionsProtocol, SlugAdapterProtocol } from '../SlugAdapterProtocol';

export class SlugifyAdapter implements SlugAdapterProtocol {
  private readonly _defaultSlugOptions: SlugOptionsProtocol = {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  };

  public generate(s: string, options?: SlugOptionsProtocol): string {
    return slugify(s, { ...(options || this._defaultSlugOptions) });
  }
}
