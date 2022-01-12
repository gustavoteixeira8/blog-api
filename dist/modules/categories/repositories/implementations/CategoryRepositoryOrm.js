"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryRepositoryOrm = void 0;

var _CategoryMapper = require("../../mappers/CategoryMapper");

var _typeorm = require("typeorm");

var _CategoryEntity = require("../../../../shared/infra/database/entities/CategoryEntity");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CategoryRepositoryOrm {
  constructor() {
    _defineProperty(this, "_table", (0, _typeorm.getRepository)(_CategoryEntity.CategoryEntity));
  }

  async save(category) {
    const categoryMapped = _CategoryMapper.CategoryMapper.toPersistence(category);

    await this._table.save(categoryMapped);
  }

  async delete(categoryId) {
    await this._table.delete(categoryId);
  }

  async existsWithSlug(slug) {
    const category = await this._table.findOne({
      where: {
        slug
      }
    });
    return !!category;
  }

  async findById(categoryId) {
    const category = await this._table.findOne({
      where: {
        id: categoryId
      }
    });
    if (!category) return;
    return _CategoryMapper.CategoryMapper.toDomain(category);
  }

  async findBySlug(categorySlug) {
    const category = await this._table.findOne({
      where: {
        slug: categorySlug
      }
    });
    if (!category) return;
    return _CategoryMapper.CategoryMapper.toDomain(category);
  }

  async findAllPaginate(pagination) {
    const {
      order,
      perPage,
      page
    } = pagination;
    const [categories, count] = await this._table.findAndCount({
      take: perPage,
      skip: page,
      order
    });
    return {
      data: categories.map(_CategoryMapper.CategoryMapper.toDomain),
      page: Math.ceil(page / perPage + 1),
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
      order: order || null
    };
  }

  async existsInArticle(categoryId) {
    const category = await this._table.createQueryBuilder('c').withDeleted().leftJoinAndSelect('c.articles', 'article').where('c.id = :categoryId', {
      categoryId
    }).getOne();
    return !!category?.articles.length;
  }

}

exports.CategoryRepositoryOrm = CategoryRepositoryOrm;