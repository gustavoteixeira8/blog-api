import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { SlugProviderProtocol } from '@shared/providers/slugProvider/SlugProviderProtocol';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { Article } from '../entities/Article';
import { QueueProviderProtocol } from '@shared/providers/queueProvider/QueueProviderProtocol';
import { MailOptionsProtocol } from '@shared/providers/mailProvider/MailProvider';
import { appConfig } from '@config/app';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';
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

@injectable()
export class CreateArticleUseCase implements UseCaseProtocol<CreateArticleRequest, Promise<void>> {
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
    categoriesId,
  }: CreateArticleRequest): Promise<void> {
    if (!userId) {
      throw new MissingParamError('User id');
    }

    if (!title || !text) {
      throw new MissingParamError('Title and text');
    }

    if (!categoriesId || !categoriesId.length) {
      throw new MissingParamError('Category id');
    }

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user) throw new UserNotFoundError();

    if (!user.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!user.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const slug = this._slugProvider.generate(title);

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
      this._mailQueueProvider.add({
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
