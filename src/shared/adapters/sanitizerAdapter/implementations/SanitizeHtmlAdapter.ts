import { SanitizerAdapterProtocol } from '../SanitizerAdapterProtocol';
import sanitizeHTML from 'sanitize-html';
import { sanitizeConfig } from '@config/sanitize';

export class SanitizeHtmlAdapter implements SanitizerAdapterProtocol {
  public sanitize(value: any): string | any {
    if (typeof value !== 'string') return value;

    return sanitizeHTML(value, sanitizeConfig);
  }
}
