import { HashAdapterProtocol } from '@shared/adapters/hashAdapter/HashAdapterProtocol';
import { BCryptAdapter } from '@shared/adapters/hashAdapter/implementations/BCryptAdapter';

export const makeHashAdapter = (): HashAdapterProtocol => {
  return new BCryptAdapter();
};
