import { SharpAdapter } from './implementations/SharpAdapter';
import { ProcessImageAdapterProtocol } from './ProcessImageAdapterProtocol';

export const makeProcessImageAdapter = (): ProcessImageAdapterProtocol => {
  return new SharpAdapter();
};
