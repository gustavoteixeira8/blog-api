import { Article } from '@modules/articles/entities/Article';
import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { RepositoryOptions } from '@shared/core/repositories/RepositoryOptions';
import { getRepository, IsNull, Not } from 'typeorm';
import { ArticleEntity } from '@shared/infra/database/entities/ArticleEntity';
import {
  ArticleRepositoryProtocol,
  ArticlesPaginateResponse,
  SearchArticlesProtocol,
} from '../ArticleRepositoryProtocol';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { PaginationOptionsProtocol } from '@shared/core/repositories/PaginationProtocol';

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

  public async findBySlugWithRelations(
    articleSlug: string,
  ): Promise<ArticleWithRelationsDTO | undefined> {
    const article = await this._table.findOne({
      join: {
        alias: 'a',
        leftJoinAndSelect: { user: 'a.user', categories: 'a.categories' },
      },
      where: { slug: articleSlug },
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
    searchOptions: SearchArticlesProtocol,
    pagination: PaginationOptionsProtocol,
  ): Promise<ArticlesPaginateResponse> {
    const { order, page, perPage } = pagination;
    const { articleTitle, categoryName, username, isDeleted, isPublic, userId } = searchOptions;

    const qb = this._table
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.user', 'user')
      .leftJoinAndSelect('a.categories', 'category')
      .take(perPage)
      .skip(page)
      .where('a.isPublic = true');

    if (userId) {
      qb.where('user.id = :userId', { userId });
    }

    if (order) {
      for (const key in order) {
        qb.addOrderBy(`a.${key}`, order[key]);
      }
    }

    if (articleTitle) {
      qb.andWhere('lower(a.title) like :articleTitle', {
        articleTitle: `%${articleTitle.toLowerCase()}%`,
      });
    }

    if (categoryName) {
      qb.andWhere('lower(category.name) like :categoryName', {
        categoryName: `${categoryName.toLowerCase()}%`,
      });
    }

    if (username) {
      qb.andWhere('lower(user.username) like :username', {
        username: `%${username.toLowerCase()}%`,
      });
    }

    if (isDeleted === true) {
      qb.withDeleted().andWhere('a.deletedAt is not null');
    } else if (isDeleted === false) {
      qb.andWhere('a.deletedAt is null');
    }

    if (isPublic !== undefined) {
      qb.andWhere('a.isPublic = :isPublic', { isPublic });
    }

    const [articles, count] = await qb.getManyAndCount();

    return {
      data: articles.map((article) => {
        const user = UserMapper.toDomain(article.user);
        const categories = article.categories.map(CategoryMapper.toDomain);

        return { article: ArticleMapper.toDomain(article), user, categories };
      }),
      page: Math.ceil(page / perPage + 1),
      order,
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
    };
  }
}
