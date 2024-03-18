import { resolve } from 'path';

export interface FileTemplateProtocol {
  module: string;
  filename: string;
}

export interface TemplateOptionsProtocol {
  file: FileTemplateProtocol;
  variables?: Record<string, any>;
}

export abstract class TemplateAdapterProtocol {
  public abstract parse({ file, variables }: TemplateOptionsProtocol): Promise<string | never>;

  protected normalizeFilePath(file: FileTemplateProtocol): string {
    const isDev = process.env.NODE_ENV;

    const rootPath = isDev === 'development' ? 'src' : 'dist';

    return resolve(rootPath, 'modules', `${file.module}`, 'views', `${file.filename}.hbs`);
  }
}
