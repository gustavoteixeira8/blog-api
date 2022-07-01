import { JsonWebTokenAdapter } from '@shared/adapters/tokenAdapter/implementations/JsonWebTokenAdapter';
import { TokenAdapterProtocol } from '@shared/adapters/tokenAdapter/TokenAdapterProtocol';

export const makeTokenAdapter = (): TokenAdapterProtocol => {
  return new JsonWebTokenAdapter();
};
