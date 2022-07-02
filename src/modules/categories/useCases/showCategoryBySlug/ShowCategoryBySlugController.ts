import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowCategoryBySlugUseCase } from './ShowCategoryBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class ShowCategoryBySlugController extends WebController {
  constructor(useCase: ShowCategoryBySlugUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categorySlug } = httpRequest.params;

    const category = await this._useCase.execute({ categorySlug });

    const categoryFormatted = CategoryMapper.toDetails(category);

    return ok({ data: categoryFormatted, message: null });
  }
}
