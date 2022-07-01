import { SearchArticlesForUserCreatorController } from './SearchArticlesForUserCreatorController';
import { SearchArticlesForUserCreatorUseCase } from './SearchArticlesForUserCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeSearchArticlesForUserCreator = (): WebController => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new SearchArticlesForUserCreatorUseCase(userRepository, articleRepository);
  return new SearchArticlesForUserCreatorController(useCase);
};
