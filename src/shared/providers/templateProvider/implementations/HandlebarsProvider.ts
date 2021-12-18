import fs from 'fs';
import hbs from 'handlebars';
import { TemplateOptionsProtocol, TemplateProviderProtocol } from '../TemplateProviderProtocol';

export class HandlebarsProvider extends TemplateProviderProtocol {
  public async parse({ file, variables }: TemplateOptionsProtocol): Promise<string | never> {
    try {
      this.defineHelpers();

      const fileContent = await fs.promises.readFile(this.normalizeFilePath(file), {
        encoding: 'utf8',
      });

      const parseContent = hbs.compile(fileContent);

      return parseContent(variables);
    } catch (error) {
      throw new Error('Template provider error');
    }
  }

  private defineHelpers(): void {
    hbs.registerHelper('convertDate', (value) => {
      if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
        return new Date(value).toUTCString();
      }
    });
  }
}
