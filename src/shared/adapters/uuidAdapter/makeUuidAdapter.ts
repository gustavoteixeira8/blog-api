import { UuidAdapter } from './implementations/UuidAdapter';

export const makeUuidAdapter = () => {
  return new UuidAdapter();
};
