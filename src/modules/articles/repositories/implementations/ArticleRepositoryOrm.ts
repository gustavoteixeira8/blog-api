import { Article } from '@modules/articles/entities/Article';
import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import {
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { getRepository, IsNull, Not } from 'typeorm';
import { ArticleEntity } from '@shared/infra/database/entities/ArticleEntity';
import { ArticleRepositoryProtocol, SearchArticleOptions } from '../ArticleRepositoryProtocol';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';

export class ArticleRepositoryOrm implements ArticleRepositoryProtocol {
  private readonly _table = getRepository(ArticleEntity);

  public async save(article: Article): Promise<void> {
    const articleFormatted = ArticleMapper.toPersistence(article);
    const categoriesFormatted = articleFormatted.categoriesId.map((id) => ({ id }));

    await this._table.save({ categories: categoriesFormatted, ...articleFormatted });
  }

  public async delete(articleId: string): Promise<void> {
    await this._table.delete(articleId);
  }

  public async findById(
    articleId: string,
    options?: RepositoryOptions,
  ): Promise<Article | undefined> {
    const article = await this._table.findOne({
      where: { id: articleId },
      ...options,
    });

    if (!article) return;

    return ArticleMapper.toDomain(article);
  }

  public async findAllDeleted(): Promise<Article[]> {
    const articles = await this._table.find({
      where: { deletedAt: Not(IsNull()) },
      withDeleted: true,
    });

    return articles.map(ArticleMapper.toDomain);
  }

  public async existsWithSlug(slug: string, options?: RepositoryOptions): Promise<boolean> {
    const article = await this._table.findOne({ where: { slug }, ...options });

    return !!article;
  }

  public async findPublicByIdWithRelations(
    articleId: string,
    options?: RepositoryOptions,
  ): Promise<ArticleWithRelationsDTO | undefined> {
    const article = await this._table.findOne({
      join: {
        alias: 'a',
        leftJoinAndSelect: { user: 'a.user', categories: 'a.categories' },
      },
      where: { id: articleId, isPublic: true },
      ...options,
    });

    if (!article) return;

    return {
      article: ArticleMapper.toDomain(article),
      user: UserMapper.toDomain(article.user),
      categories: article.categories.map(CategoryMapper.toDomain),
    };
  }

  public async findForCreatorByIdWithRelations(
    articleId: string,
    userId: string,
  ): Promise<ArticleWithRelationsDTO | undefined> {
    const article = await this._table.findOne({
      join: {
        alias: 'a',
        leftJoinAndSelect: { user: 'a.user', categories: 'a.categories' },
      },
      where: { id: articleId, userId },
      withDeleted: true,
    });

    if (!article) return;

    return {
      article: ArticleMapper.toDomain(article),
      user: UserMapper.toDomain(article.user),
      categories: article.categories.map(CategoryMapper.toDomain),
    };
  }

  public async searchWithRelations(
    searchOptions: SearchArticleOptions,
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>> {
    const { order, perPage, page } = pagination;
    const { isPublic, categorySlug, username, title, withDeleted } = searchOptions;

    const qb = this._table
      .createQueryBuilder('a')
      .take(perPage)
      .skip(page)
      .leftJoinAndSelect('a.user', 'user')
      .leftJoinAndSelect('a.categories', 'category');

    if (order) {
      for (const key in order) {
        qb.orderBy(`a.${key}`, order[key]);
      }
    }

    if (withDeleted === true) {
      qb.withDeleted();
    }

    if (title) {
      qb.andWhere('a.title like :title', { title: `%${title}%` });
    }

    if (isPublic !== undefined) {
      qb.andWhere('a.isPublic = :isPublic', { isPublic });
    }

    if (categorySlug) {
      qb.andWhere('category.slug = :categorySlug', { categorySlug });
    }

    if (username) {
      qb.andWhere('user.username = :username', { username });
    }

    const [articles, count] = await qb.getManyAndCount();

    return {
      data: articles.map((article) => {
        const user = UserMapper.toDomain(article.user);
        const categories = article.categories.map(CategoryMapper.toDomain);

        return { article: ArticleMapper.toDomain(article), user, categories };
      }),
      page: Math.ceil(page / perPage + 1),
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
      order: order || null,
    };
  }
}
