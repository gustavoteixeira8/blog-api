import { SanitizerProviderProtocol } from '../SanitizerProviderProtocol';
import sanitizeHTML from 'sanitize-html';

export class SanitizeHtmlProvider implements SanitizerProviderProtocol {
  sanitize(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('SanitizeHtmlProvider: value must be a string');
    }

    return sanitizeHTML(value);
  }
}
