import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import {
  OrderByProtocol,
  PaginationOptionsProtocol,
  PaginationResponseProtocol,
} from '@shared/core/repositories/PaginationProtocol';
import { ArticleWithRelationsDTO } from '@modules/articles/dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '@modules/articles/repositories/ArticleRepositoryProtocol';

export type ShowArticlesByCategoryRequest = Partial<PaginationOptionsProtocol> & {
  categoryId: string;
};
export type ShowArticlesByCategoryResponse = Promise<
  PaginationResponseProtocol<ArticleWithRelationsDTO>
>;

@injectable()
export class ShowAllPublicArticlesByCategoryUseCase
  implements UseCaseProtocol<ShowArticlesByCategoryRequest, ShowArticlesByCategoryResponse>
{
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
  ) {}

  public async execute({
    order,
    page,
    perPage,
    categoryId,
  }: ShowArticlesByCategoryRequest): ShowArticlesByCategoryResponse {
    const take = !perPage || perPage > 20 ? 20 : Math.ceil(perPage);
    const skip = page ? take * (Math.ceil(page) - 1) : 0;
    const orderByDefault = Object.keys(order || {}).length ? order : { createdAt: 'DESC' };
    const pagination = {
      order: orderByDefault as OrderByProtocol,
      page: skip,
      perPage: take,
    };

    return await this._articleRepository.findAllPublicByCategoryWithRelations(
      categoryId,
      pagination,
    );
  }
}
