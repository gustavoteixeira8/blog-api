import { InvalidArticleTextError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class ArticleText extends ValueObjectProtocol<string> {
  public static create(text: string): ArticleText | InvalidArticleTextError {
    if (!this.validate(text)) {
      return new InvalidArticleTextError();
    }

    return new ArticleText(text);
  }

  public static validate(text: string): boolean {
    if (typeof text !== 'string') return false;

    return text.length >= 100 && text.length <= 30_000;
  }
}
