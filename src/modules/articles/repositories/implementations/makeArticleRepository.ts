import { ArticleRepositoryProtocol } from '@modules/articles/repositories/ArticleRepositoryProtocol';
import { ArticleRepositoryOrm } from '@modules/articles/repositories/implementations/ArticleRepositoryOrm';

export const makeArticleRepository = (): ArticleRepositoryProtocol => {
  return new ArticleRepositoryOrm();
};
