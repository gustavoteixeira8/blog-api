import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../repositories/CategoryRepositoryProtocol';
import { Category } from '../entities/Category';
import { CategoryNotFoundError, MissingParamError } from '@shared/core/errors';

export interface ShowCategoryRequest {
  categorySlug: string;
}

@injectable()
export class ShowCategoryBySlugUseCase
  implements UseCaseProtocol<ShowCategoryRequest, Promise<Category>>
{
  constructor(
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
  ) {}

  public async execute({ categorySlug }: ShowCategoryRequest): Promise<Category> {
    if (!categorySlug) throw new MissingParamError('Category id');

    const category = await this._categoryRepository.findBySlug(categorySlug);

    if (!category) throw new CategoryNotFoundError();

    return category;
  }
}
