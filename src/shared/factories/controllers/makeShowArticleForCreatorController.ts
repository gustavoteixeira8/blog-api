import { ShowArticleForCreatorController } from '@modules/users/infra/http/controllers/ShowArticleForCreatorController';
import { ShowArticleForCreatorUseCase } from '@modules/users/useCases/ShowArticleForCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeArticleRepository } from '../repositories/makeArticleRepository';
import { makeUserRepository } from '../repositories/makeUserRepository';

export const makeShowArticleForCreatorController = (): WebController => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new ShowArticleForCreatorUseCase(articleRepository, userRepository);
  return new ShowArticleForCreatorController(useCase);
};
