import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../repositories/CategoryRepositoryProtocol';
import { Category } from '../entities/Category';
import { CategoryNotFoundError, MissingParamError } from '@shared/core/errors';

export interface ShowCategoryByIdRequest {
  categoryId: string;
}

@injectable()
export class ShowCategoryByIdUseCase
  implements UseCaseProtocol<ShowCategoryByIdRequest, Promise<Category>>
{
  constructor(
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
  ) {}

  public async execute({ categoryId }: ShowCategoryByIdRequest): Promise<Category> {
    if (!categoryId) throw new MissingParamError('Category id');

    const category = await this._categoryRepository.findById(categoryId);

    if (!category) throw new CategoryNotFoundError();

    return category;
  }
}
