import { SanitizeHtmlAdapter } from './implementations/SanitizeHtmlAdapter';
import { SanitizerAdapterProtocol } from './SanitizerAdapterProtocol';

export const makeSanitizeAdapter = (): SanitizerAdapterProtocol => {
  return new SanitizeHtmlAdapter();
};
