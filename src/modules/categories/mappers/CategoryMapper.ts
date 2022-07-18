import { CategoryDetailsDTO } from '../dtos/CategoryDetailsDTO';
import { CategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/Category';
import { CategoryProtocol } from '../entities/CategoryProtocol';

export class CategoryMapper {
  public static toPersistence(category: Category): CategoryDTO {
    return {
      id: category.id?.value || '',
      name: category.name.value,
      slug: category.slug.value,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  public static toDomain(category: CategoryDTO): Category {
    const categoryOrError = Category.create(category);

    if (categoryOrError instanceof Error) {
      return {} as Category;
    }

    return categoryOrError;
  }

  public static toDetails(category: CategoryProtocol): CategoryDetailsDTO {
    return {
      id: category.id?.value || '',
      name: category.name.value,
      slug: category.slug.value,
    };
  }
}
