import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  CategoriesPaginateResponse,
  CategoryRepositoryProtocol,
} from '../../repositories/CategoryRepositoryProtocol';
import {
  OrderByProtocol,
  PaginationOptionsProtocol,
} from '@shared/core/repositories/PaginationProtocol';

export type ShowAllCategoriesRequest = Partial<PaginationOptionsProtocol>;
export type ShowAllCategoriesResponse = Promise<CategoriesPaginateResponse>;

export class ShowAllCategoriesUseCase
  implements UseCaseProtocol<ShowAllCategoriesRequest, ShowAllCategoriesResponse>
{
  constructor(private readonly _categoryRepository: CategoryRepositoryProtocol) {}

  public async execute({
    order,
    page,
    perPage,
  }: ShowAllCategoriesRequest): ShowAllCategoriesResponse {
    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    const categories = await this._categoryRepository.findAllPaginate(pagination);

    return categories;
  }
}
