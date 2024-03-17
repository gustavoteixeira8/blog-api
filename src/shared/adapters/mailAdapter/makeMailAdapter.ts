import { makeTemplateAdapter } from '../templateAdapter/makeTemplateAdapter';
import { BrevoMailAdapter } from './implementations/BrevoMailAdapter';
import { MailTrapAdapter } from './implementations/MailTrapAdapter';
import { SendGridMailAdapter } from './implementations/SendGridMailAdapter';

export const makeMailAdapter = () => {
  const templateAdapter = makeTemplateAdapter();
  return new BrevoMailAdapter(templateAdapter);
};
