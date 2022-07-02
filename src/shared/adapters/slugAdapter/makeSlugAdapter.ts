import { SlugifyAdapter } from './implementations/SlugifyAdapter';
import { SlugAdapterProtocol } from './SlugAdapterProtocol';

export const makeSlugAdapter = (): SlugAdapterProtocol => {
  return new SlugifyAdapter();
};
