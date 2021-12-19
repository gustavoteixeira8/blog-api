import {
  OrderByProtocol,
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { inject, injectable } from 'tsyringe';
import { ArticleWithRelationsDTO } from '../dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

export type ShowArticlesRequest = Partial<PaginationOptionsProtocol>;
export type ShowArticlesResponse = Promise<PaginationResponseProtocol<ArticleWithRelationsDTO>>;

@injectable()
export class ShowAllPublicArticlesUseCase
  implements UseCaseProtocol<ShowArticlesRequest, ShowArticlesResponse>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({ order, page, perPage }: ShowArticlesRequest): ShowArticlesResponse {
    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    return await this._articleRepository.findAllPublicWithRelations(pagination);
  }
}
