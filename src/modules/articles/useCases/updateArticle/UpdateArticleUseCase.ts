import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { ArticleTitle } from '@shared/core/valueObjects/ArticleTitle';
import { ArticleText } from '@shared/core/valueObjects/ArticleText';
import { Slug } from '@shared/core/valueObjects/Slug';
import { ForeignKeyId } from '@shared/core/valueObjects/ForeignKeyId';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
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

export interface UpdateArticleRequest {
  title?: string;
  text?: string;
  isPublic?: boolean;
  categoriesId?: string[];
  userId: string;
  articleId: string;
}

export type UpdateArticleResponse = Promise<
  | void
  | ArticleIsNotYoursError
  | ArticleNotFoundError
  | ArticleTitleAlreadyExistsError
  | CategoryNotFoundError
  | InvalidArticleTextError
  | InvalidArticleTitleError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
  | MaxOfDifferentCategoriesError
>;

export class UpdateArticleUseCase
  implements UseCaseProtocol<UpdateArticleRequest, UpdateArticleResponse>
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
    articleId,
    categoriesId,
  }: UpdateArticleRequest): UpdateArticleResponse {
    if (!articleId || !userId) return new MissingParamError('Article id and user id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) {
      return new UserNotFoundError();
    }

    if (!user.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      return new UserIsNotAdminError();
    }

    const article = await this._articleRepository.findById(articleId, { withDeleted: false });

    if (!article) return new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      return new ArticleIsNotYoursError();
    }

    if (title && title !== article.title.value) {
      const slug = this._slugAdapter.generate(title);

      const articleWithSlugAlreadyExists = await this._articleRepository.existsWithSlug(slug, {
        withDeleted: true,
      });

      if (articleWithSlugAlreadyExists) {
        return new ArticleTitleAlreadyExistsError();
      }

      const titleOrError = ArticleTitle.create(title);
      const slugOrError = Slug.create(slug);

      if (titleOrError instanceof Error || slugOrError instanceof Error) {
        return new InvalidArticleTitleError();
      }

      article.updateTitle(titleOrError, slugOrError);
    }

    if (text && text !== article.text.value) {
      const textOrError = ArticleText.create(text);

      if (textOrError instanceof InvalidArticleTextError) {
        return new InvalidArticleTextError();
      }

      article.updateText(textOrError);
    }

    if (typeof isPublic !== 'undefined') {
      if (isPublic === true) {
        article.makePublic();
      } else {
        article.makePrivate();
      }
    }

    if (categoriesId && categoriesId.length > 0 && categoriesId.length < 5) {
      const categoriesFK: ForeignKeyId[] = [];

      for (const categoryId of categoriesId) {
        const category = await this._categoryRepository.findById(categoryId);

        if (!category) return new CategoryNotFoundError();

        const categoryFK = ForeignKeyId.create(category.id.value);

        if (categoryFK instanceof Error) {
          continue;
        }

        categoriesFK.push(categoryFK);
      }

      article.updateCategories(categoriesFK);
    }

    this._articleRepository.save(article);
  }
}
