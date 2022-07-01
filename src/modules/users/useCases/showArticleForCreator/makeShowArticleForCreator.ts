import { ShowArticleForCreatorController } from './ShowArticleForCreatorController';
import { ShowArticleForCreatorUseCase } from './ShowArticleForCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '../../repositories/implementations/makeUserRepository';

export const makeShowArticleForCreator = (): WebController => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new ShowArticleForCreatorUseCase(articleRepository, userRepository);
  return new ShowArticleForCreatorController(useCase);
};
