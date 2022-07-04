import { InvalidArticleTitleError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class ArticleTitle extends ValueObjectProtocol<string> {
  public static create(title: string): ArticleTitle | InvalidArticleTitleError {
    const titleFormatted = this.format(title);

    if (!this.validate(titleFormatted)) {
      return new InvalidArticleTitleError();
    }

    return new ArticleTitle(titleFormatted);
  }

  public static format(title: string): string {
    return title[0].toUpperCase() + title.substring(1);
  }

  public static validate(title: string): boolean {
    if (typeof title !== 'string') return false;

    const nameTrim = title.trim();
    const checkLength = nameTrim.length >= 5 && nameTrim.length < 255;
    const alphanumericAndNonAlphanumeric = /^[\w\W]+$/.test(title);

    return checkLength && alphanumericAndNonAlphanumeric;
  }
}
