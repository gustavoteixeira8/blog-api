import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowAllCategoriesUseCase } from './ShowAllCategoriesUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class ShowAllCategoriesController extends WebController {
  constructor(useCase: ShowAllCategoriesUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { order, perPage, page } = httpRequest.query;

    const orderFormatted = this.resolveQueryOrderBy(order as string);
    const numbersFormatted = this.resolveQueryNumbers({ perPage, page });

    const result = await this._useCase.execute({
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      order: orderFormatted,
    });

    const articlesFormatted = result.data.map(CategoryMapper.toDetails);

    return ok({ message: null, data: { data: articlesFormatted, ...result } });
  }
}
