import { MailTrapAdapter } from './implementations/MailTrapAdapter';

export const makeMailAdapter = () => {
  return new MailTrapAdapter();
};
