import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { Article } from '../../entities/Article';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';
import {
  ArticleTitleAlreadyExistsError,
  CategoryNotFoundError,
  InvalidArticleTextError,
  InvalidArticleTitleError,
  MaxOfDifferentCategoriesError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface CreateArticleRequest {
  title: string;
  text: string;
  isPublic: boolean;
  userId: string;
  categoriesId: string[];
}

export type CreateArticleResponse = Promise<
  | void
  | ArticleTitleAlreadyExistsError
  | CategoryNotFoundError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
  | InvalidArticleTitleError
  | InvalidArticleTextError
  | MaxOfDifferentCategoriesError
>;

export class CreateArticleUseCase
  implements UseCaseProtocol<CreateArticleRequest, CreateArticleResponse>
{
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _slugAdapter: SlugAdapterProtocol,
  ) {}

  public async execute({
    title,
    text,
    isPublic,
    userId,
    categoriesId,
  }: CreateArticleRequest): CreateArticleResponse {
    if (!userId) {
      return new MissingParamError('User id');
    }

    if (!title || !text || !categoriesId || !categoriesId.length) {
      return new MissingParamError('Title, text and categories id');
    }

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) return new UserNotFoundError();

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }

    const slug = this._slugAdapter.generate(title);

    const articleExists = await this._articleRepository.existsWithSlug(slug, {
      withDeleted: true,
    });

    if (articleExists) {
      return new ArticleTitleAlreadyExistsError();
    }

    const articleOrError = Article.create({
      title,
      text,
      slug,
      userId,
      categoriesId,
      isPublic,
      thumbnail: null,
    });

    if (articleOrError instanceof Error) {
      return articleOrError;
    }

    for (const categoryId of categoriesId) {
      const categoryExists = await this._categoryRepository.findById(categoryId);

      if (!categoryExists) {
        return new CategoryNotFoundError();
      }
    }

    this._articleRepository.save(articleOrError);
  }
}
