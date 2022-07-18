import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../../repositories/CategoryRepositoryProtocol';
import { CategoryNotFoundError, MissingParamError } from '@shared/core/errors';
import { CategoryProtocol } from '@modules/categories/entities/CategoryProtocol';

export interface ShowCategoryRequest {
  categorySlug: string;
}

export type ShowCategoryResponse = Promise<
  CategoryProtocol | MissingParamError | CategoryNotFoundError
>;

export class ShowCategoryBySlugUseCase
  implements UseCaseProtocol<ShowCategoryRequest, ShowCategoryResponse>
{
  constructor(private readonly _categoryRepository: CategoryRepositoryProtocol) {}

  public async execute({ categorySlug }: ShowCategoryRequest): ShowCategoryResponse {
    if (!categorySlug) return new MissingParamError('Category slug');

    const category = await this._categoryRepository.findBySlug(categorySlug);

    if (!category) return new CategoryNotFoundError();

    return category;
  }
}
