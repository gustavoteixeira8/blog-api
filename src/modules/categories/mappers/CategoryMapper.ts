import { CategoryDetailsDTO } from '../dtos/CategoryDetailsDTO';
import { CategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/Category';

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
    return Category.create(category);
  }

  public static toDetails(category: Category): CategoryDetailsDTO {
    return {
      id: category.id.value,
      name: category.name.value,
      slug: category.slug.value,
    };
  }
}
