import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { SlugProviderProtocol } from '@shared/providers/slugProvider/SlugProviderProtocol';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { ArticleTitle } from '@shared/core/entities/valueObjects/ArticleTitle';
import { ArticleText } from '@shared/core/entities/valueObjects/ArticleText';
import { Slug } from '@shared/core/entities/valueObjects/Slug';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { appConfig } from '@config/app';
import { ForeignKeyId } from '@shared/core/entities/valueObjects/ForeignKeyId';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  ArticleTitleAlreadyExistsError,
  CategoryNotFoundError,
  InvalidArticleTextError,
  InvalidArticleTitleError,
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

@injectable()
export class UpdateArticleUseCase implements UseCaseProtocol<UpdateArticleRequest, Promise<void>> {
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('SlugProvider')
    private readonly _slugProvider: SlugProviderProtocol,
    @inject('MailQueueProvider')
    private readonly _mailQueueProvider: QueueProviderProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    title,
    text,
    isPublic,
    userId,
    articleId,
    categoriesId,
  }: UpdateArticleRequest): Promise<void> {
    if (!articleId || !userId) throw new MissingParamError('Article id and user id');

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const article = await this._articleRepository.findById(articleId, { withDeleted: false });

    if (!article) throw new ArticleNotFoundError();

    if (article.userId.value !== user.id.value) {
      throw new ArticleIsNotYoursError();
    }

    const articleToCompare = JSON.stringify(article);

    if (title && title !== article.title.value) {
      const slug = this._slugProvider.generate(title);

      const articleWithSlugAlreadyExists = await this._articleRepository.existsWithSlug(slug, {
        withDeleted: true,
      });

      if (articleWithSlugAlreadyExists) {
        throw new ArticleTitleAlreadyExistsError();
      }

      const titleOrError = ArticleTitle.create(title);
      const slugOrError = Slug.create(slug);

      if (titleOrError instanceof Error || slugOrError instanceof Error) {
        throw new InvalidArticleTitleError();
      }

      article.updateTitle(titleOrError, slugOrError);
    }

    if (text && text !== article.text.value) {
      const textOrError = ArticleText.create(text);

      if (textOrError instanceof InvalidArticleTextError) {
        throw new InvalidArticleTextError();
      }

      article.updateText(textOrError);
    }

    if (typeof isPublic !== 'undefined') {
      if (isPublic === true) article.makePublic();
      else article.makePrivate();
    }

    if (categoriesId && categoriesId.length) {
      const categoriesFK: ForeignKeyId[] = [];

      for (const categoryId of categoriesId) {
        const category = await this._categoryRepository.findById(categoryId);

        if (!category) throw new CategoryNotFoundError();

        const categoryFK = ForeignKeyId.create(category.id.value);

        if (categoryFK instanceof Error) {
          continue;
        }

        categoriesFK.push(categoryFK);
      }

      article.updateCategories(categoriesFK);
    }

    const articleUpdatedToCompare = JSON.stringify(article);

    if (articleToCompare !== articleUpdatedToCompare) {
      await Promise.all([
        this._articleRepository.save(article),
        this._mailQueueProvider.add({
          to: {
            name: user.fullName.value,
            address: user.email.value,
          },
          subject: `An article was updated by you - ${appConfig.name}`,
          context: {
            user: { username: user.username.value },
            article: {
              id: article.id.value,
              title: article.title.value,
              slug: article.slug.value,
              isPublic: article.isPublic,
              createdAt: article.createdAt,
            },
            appConfig,
          },
          html: {
            filename: 'articleUpdated',
            module: 'articles',
          },
        }),
      ]);
    }
  }
}
