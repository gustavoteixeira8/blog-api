import slugify from 'slugify';
import { SlugOptionsProtocol, SlugProviderProtocol } from '../SlugProviderProtocol';

export class SlugifyProvider implements SlugProviderProtocol {
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
