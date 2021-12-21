"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArticleRepositoryOrm = void 0;

var _ArticleMapper = require("../../mappers/ArticleMapper");

var _typeorm = require("typeorm");

var _ArticleEntity = require("../../../../shared/infra/database/entities/ArticleEntity");

var _UserMapper = require("../../../users/mappers/UserMapper");

var _CategoryMapper = require("../../../categories/mappers/CategoryMapper");

class ArticleRepositoryOrm {
  constructor() {
    this._table = (0, _typeorm.getRepository)(_ArticleEntity.ArticleEntity);
  }

  async save(article) {
    const articleFormatted = _ArticleMapper.ArticleMapper.toPersistence(article);

    const categoriesFormatted = articleFormatted.categoriesId.map(id => ({
      id
    }));
    await this._table.save({
      categories: categoriesFormatted,
      ...articleFormatted
    });
  }

  async delete(articleId) {
    await this._table.delete(articleId);
  }

  async findById(articleId, options) {
    const article = await this._table.findOne({
      where: {
        id: articleId
      },
      ...options
    });
    if (!article) return;
    return _ArticleMapper.ArticleMapper.toDomain(article);
  }

  async findAllDeleted() {
    const articles = await this._table.find({
      where: {
        deletedAt: (0, _typeorm.Not)((0, _typeorm.IsNull)())
      },
      withDeleted: true
    });
    return articles.map(_ArticleMapper.ArticleMapper.toDomain);
  }

  async existsWithSlug(slug, options) {
    const article = await this._table.findOne({
      where: {
        slug
      },
      ...options
    });
    return !!article;
  }

  async findPublicByIdWithRelations(articleId, options) {
    const article = await this._table.findOne({
      join: {
        alias: 'a',
        leftJoinAndSelect: {
          user: 'a.user',
          categories: 'a.categories'
        }
      },
      where: {
        id: articleId,
        isPublic: true
      },
      ...options
    });
    if (!article) return;
    return {
      article: _ArticleMapper.ArticleMapper.toDomain(article),
      user: _UserMapper.UserMapper.toDomain(article.user),
      categories: article.categories.map(_CategoryMapper.CategoryMapper.toDomain)
    };
  }

  async searchWithRelations(searchOptions, pagination) {
    const {
      order,
      page,
      perPage
    } = pagination;
    const {
      articleTitle,
      categoryName,
      username
    } = searchOptions;

    const qb = this._table.createQueryBuilder('a').leftJoinAndSelect('a.user', 'user').leftJoinAndSelect('a.categories', 'category').take(perPage).skip(page).where('a.isPublic = true');

    if (order) {
      for (const key in order) {
        qb.addOrderBy(`a.${key}`, order[key]);
      }
    }

    if (articleTitle) {
      qb.andWhere('lower(a.title) like :articleTitle', {
        articleTitle: `%${articleTitle.toLowerCase()}%`
      });
    }

    if (categoryName) {
      qb.andWhere('lower(category.name) like :categoryName', {
        categoryName: `${categoryName.toLowerCase()}%`
      });
    }

    if (username) {
      qb.andWhere('lower(user.username) like :username', {
        username: `%${username.toLowerCase()}%`
      });
    }

    const [articles, count] = await qb.getManyAndCount();
    return {
      data: articles.map(article => {
        const user = _UserMapper.UserMapper.toDomain(article.user);

        const categories = article.categories.map(_CategoryMapper.CategoryMapper.toDomain);
        return {
          article: _ArticleMapper.ArticleMapper.toDomain(article),
          user,
          categories
        };
      }),
      page: Math.ceil(page / perPage + 1),
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
      order: order || null
    };
  }

  async searchForCreatorWithRelations(searchOptions, pagination) {
    const {
      order,
      page,
      perPage
    } = pagination;
    const {
      articleTitle,
      categoryName,
      userId,
      isDeleted,
      isPublic
    } = searchOptions;

    const qb = this._table.createQueryBuilder('a').leftJoinAndSelect('a.user', 'user').leftJoinAndSelect('a.categories', 'category').where('user.id = :userId', {
      userId
    }).take(perPage).skip(page);

    if (order) {
      for (const key in order) {
        qb.addOrderBy(`a.${key}`, order[key]);
      }
    }

    if (articleTitle) {
      qb.andWhere('lower(a.title) like :articleTitle', {
        articleTitle: `%${articleTitle.toLowerCase()}%`
      });
    }

    if (categoryName) {
      qb.andWhere('lower(category.name) like :categoryName', {
        categoryName: `${categoryName.toLowerCase()}%`
      });
    }

    if (isDeleted === true) {
      qb.withDeleted().andWhere('a.deletedAt is not null');
    } else if (isDeleted === false) {
      qb.andWhere('a.deletedAt is null');
    }

    if (isPublic !== undefined) {
      qb.andWhere('a.isPublic = :isPublic', {
        isPublic
      });
    }

    const [articles, count] = await qb.getManyAndCount();
    return {
      data: articles.map(article => {
        const user = _UserMapper.UserMapper.toDomain(article.user);

        const categories = article.categories.map(_CategoryMapper.CategoryMapper.toDomain);
        return {
          article: _ArticleMapper.ArticleMapper.toDomain(article),
          user,
          categories
        };
      }),
      page: Math.ceil(page / perPage + 1),
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
      order: order || null
    };
  }

}

exports.ArticleRepositoryOrm = ArticleRepositoryOrm;