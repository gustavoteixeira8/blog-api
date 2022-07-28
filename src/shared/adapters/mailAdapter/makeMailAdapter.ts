import { makeTemplateAdapter } from '../templateAdapter/makeTemplateAdapter';
import { SendGridMailAdapter } from './implementations/SendGridMailAdapter';

export const makeMailAdapter = () => {
  const templateAdapter = makeTemplateAdapter();
  return new SendGridMailAdapter(templateAdapter);
};
