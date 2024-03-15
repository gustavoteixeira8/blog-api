import { makeArticleRepository } from '@modules/articles/repositories/implementations/makeArticleRepository';
import { makeUserRepository } from '@modules/users/repositories/implementations/makeUserRepository';
import { SoftDeleteArticleController } from './SoftDeleteArticleController';
import { SoftDeleteArticleUseCase } from './SoftDeleteArticleUseCase';

export const makeSoftDeleteArticle = () => {
  const userRepository = makeUserRepository();
  const articleRepository = makeArticleRepository();
  const useCase = new SoftDeleteArticleUseCase(userRepository, articleRepository);
  return new SoftDeleteArticleController(useCase);
};
