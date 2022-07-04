import { makeTemplateAdapter } from '../templateAdapter/makeTemplateAdapter';
import { MailTrapAdapter } from './implementations/MailTrapAdapter';

export const makeMailAdapter = () => {
  const templateAdapter = makeTemplateAdapter();
  return new MailTrapAdapter(templateAdapter);
};
