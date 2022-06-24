import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { DateFnsAdapter } from '@shared/adapters/dateAdapter/implementations/DateFnsAdapter';

export const makeDateAdapter = (): DateAdapterProtocol => {
  return new DateFnsAdapter();
};
