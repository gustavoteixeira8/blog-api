export interface SlugOptionsProtocol {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

export interface SlugAdapterProtocol {
  generate(s: string, options?: SlugOptionsProtocol): string;
}
