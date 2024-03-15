import { CloudinaryStorageAdapter } from './implementations/CloudinaryStorageAdapter';
import { DiskStorageAdapter } from './implementations/DiskStorageAdapter';
import { StorageAdapterProtocol } from './StorageAdapterProtocol';

export const makeStorageAdapter = (): StorageAdapterProtocol => {
  return new DiskStorageAdapter();
};
