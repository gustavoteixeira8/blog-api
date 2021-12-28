import { SanitizerProviderProtocol } from '../SanitizerProviderProtocol';
import sanitizeHTML from 'sanitize-html';

export class SanitizeHtmlProvider implements SanitizerProviderProtocol {
  public sanitize(value: any): string | any {
    if (typeof value !== 'string') return value;

    return sanitizeHTML(value);
  }
}
