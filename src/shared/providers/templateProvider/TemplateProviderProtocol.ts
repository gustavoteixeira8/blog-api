import { resolve } from 'path';

export interface FileTemplateProtocol {
  module: string;
  filename: string;
}

export interface TemplateOptionsProtocol {
  file: FileTemplateProtocol;
  variables?: Record<string, any>;
}

export abstract class TemplateProviderProtocol {
  public abstract parse({ file, variables }: TemplateOptionsProtocol): Promise<string | never>;

  protected normalizeFilePath(file: FileTemplateProtocol): string {
    return resolve('src', 'modules', `${file.module}`, 'views', `${file.filename}.hbs`);
  }
}
