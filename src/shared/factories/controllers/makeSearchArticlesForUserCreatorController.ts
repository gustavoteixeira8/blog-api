import { SearchArticlesForUserCreatorController } from '@modules/users/infra/http/controllers/SearchArticlesForUserCreatorController';
import { SearchArticlesForUserCreatorUseCase } from '@modules/users/useCases/SearchArticlesForUserCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeArticleRepository } from '../repositories/makeArticleRepository';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeSearchArticlesForUserCreatorController = (): WebController => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new SearchArticlesForUserCreatorUseCase(userRepository, articleRepository);
  return new SearchArticlesForUserCreatorController(useCase);
};
