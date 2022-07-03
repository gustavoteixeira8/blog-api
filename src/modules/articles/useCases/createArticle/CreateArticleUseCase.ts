import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { Article } from '../../entities/Article';
import { QueueAdapterProtocol } from '@shared/adapters/queueAdapter/QueueAdapterProtocol';
import { MailOptionsProtocol } from '@shared/adapters/mailAdapter/MailAdapterProtocol';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';
import {
  ArticleTitleAlreadyExistsError,
  CategoryNotFoundError,
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

export class CreateArticleUseCase implements UseCaseProtocol<CreateArticleRequest, Promise<void>> {
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _slugAdapter: SlugAdapterProtocol,
    private readonly _mailQueueAdapter: QueueAdapterProtocol<MailOptionsProtocol>,
  ) {}

  public async execute({
    title,
    text,
    isPublic,
    userId,
    categoriesId,
  }: CreateArticleRequest): Promise<void> {
    if (!userId) {
      throw new MissingParamError('User id');
    }

    if (!title || !text || !categoriesId || !categoriesId.length) {
      throw new MissingParamError('Title, text and categories id');
    }

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const slug = this._slugAdapter.generate(title);

    const articleExists = await this._articleRepository.existsWithSlug(slug, {
      withDeleted: true,
    });

    if (articleExists) {
      throw new ArticleTitleAlreadyExistsError();
    }

    for (const categoryId of categoriesId) {
      if (!(await this._categoryRepository.findById(categoryId))) {
        throw new CategoryNotFoundError();
      }
    }

    const article = Article.create({
      title,
      text,
      slug,
      userId,
      categoriesId,
      isPublic,
      thumbnail: null,
    });

    await Promise.all([
      this._articleRepository.save(article),
      this._mailQueueAdapter.add({
        to: {
          name: user.fullName.value,
          address: user.email.value,
        },
        subject: `A new article was created by you - ${appConfig.name}`,
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
          filename: 'articleCreated',
          module: 'articles',
        },
      }),
    ]);
  }
}