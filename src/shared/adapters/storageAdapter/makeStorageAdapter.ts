import { CloudinaryStorageAdapter } from './implementations/CloudinaryStorageAdapter';
import { StorageAdapterProtocol } from './StorageAdapterProtocol';

export const makeStorageAdapter = (): StorageAdapterProtocol => {
  return new CloudinaryStorageAdapter();
};
