import { makeSanitizeAdapter } from '@shared/adapters/sanitizerAdapter/makeSanitizerAdapter';
import { WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { SanitizeBodyMiddleware } from './SanitizeBodyMiddleware';

export const makeSanitizeBody = (): WebMiddleware => {
  const sanitizeAdapter = makeSanitizeAdapter();
  return new SanitizeBodyMiddleware(sanitizeAdapter);
};
