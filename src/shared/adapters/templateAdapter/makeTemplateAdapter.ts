import { HandlebarsAdapter } from './implementations/HandlebarsAdapter';
import { TemplateAdapterProtocol } from './TemplateAdapterProtocol';

export const makeTemplateAdapter = (): TemplateAdapterProtocol => {
  return new HandlebarsAdapter();
};
