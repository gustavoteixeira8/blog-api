import { Category } from '@modules/categories/entities/Category';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import {
  PaginationResponseProtocol,
  PaginationOptionsProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '@shared/infra/database/entities/CategoryEntity';

export class CategoryRepositoryOrm implements CategoryRepositoryProtocol {
  private readonly _table = getRepository(CategoryEntity);

  public async save(category: Category): Promise<void> {
    const categoryMapped = CategoryMapper.toPersistence(category);

    await this._table.save(categoryMapped);
  }

  public async delete(categoryId: string): Promise<void> {
    await this._table.delete(categoryId);
  }

  public async existsWithSlug(slug: string): Promise<boolean> {
    const category = await this._table.findOne({ where: { slug } });

    return !!category;
  }

  public async findById(categoryId: string): Promise<Category | undefined> {
    const category = await this._table.findOne({ where: { id: categoryId } });

    if (!category) return;

    return CategoryMapper.toDomain(category);
  }

  public async findAllPaginate(
    pagination: PaginationOptionsProtocol,
  ): Promise<PaginationResponseProtocol<Category>> {
    const { order, perPage, page } = pagination;

    const [categories, count] = await this._table.findAndCount({
      take: perPage,
      skip: page,
      order,
    });

    return {
      data: categories.map(CategoryMapper.toDomain),
      page: Math.ceil(page / perPage + 1),
      perPage,
      maxItems: count,
      maxPage: Math.ceil(count / perPage),
      order: order || null,
    };
  }

  public async existsInArticle(categoryId: string): Promise<boolean> {
    const category = await this._table
      .createQueryBuilder('c')
      .withDeleted()
      .leftJoinAndSelect('c.articles', 'article')
      .where('c.id = :categoryId', { categoryId })
      .getOne();

    return !!category?.articles.length;
  }
}
