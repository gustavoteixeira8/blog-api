import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../../repositories/CategoryRepositoryProtocol';
import { CategoryNotFoundError, MissingParamError } from '@shared/core/errors';
import { CategoryProtocol } from '@modules/categories/entities/CategoryProtocol';

export interface ShowCategoryRequest {
  categorySlug: string;
}

export class ShowCategoryBySlugUseCase
  implements UseCaseProtocol<ShowCategoryRequest, Promise<CategoryProtocol>>
{
  constructor(private readonly _categoryRepository: CategoryRepositoryProtocol) {}

  public async execute({ categorySlug }: ShowCategoryRequest): Promise<CategoryProtocol> {
    if (!categorySlug) throw new MissingParamError('Category slug');

    const category = await this._categoryRepository.findBySlug(categorySlug);

    if (!category) throw new CategoryNotFoundError();

    return category;
  }
}
