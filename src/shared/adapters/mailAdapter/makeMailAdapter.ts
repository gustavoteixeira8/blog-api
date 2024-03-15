import { makeTemplateAdapter } from '../templateAdapter/makeTemplateAdapter';
import { MailTrapAdapter } from './implementations/MailTrapAdapter';
import { SendGridMailAdapter } from './implementations/SendGridMailAdapter';

export const makeMailAdapter = () => {
  const templateAdapter = makeTemplateAdapter();
  return new MailTrapAdapter(templateAdapter);
};
