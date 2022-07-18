import { CategoryMapper } from '@modules/categories/mappers/CategoryMapper';
import { ShowCategoryBySlugUseCase } from './ShowCategoryBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { badRequest, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { CategoryNotFoundError, MissingParamError } from '@shared/core/errors';

export class ShowCategoryBySlugController extends WebController<ShowCategoryBySlugUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categorySlug } = httpRequest.params;

    const categoryOrError = await this._useCase.execute({ categorySlug });

    if (this.isTypeofErrors(categoryOrError, MissingParamError.name)) {
      return badRequest({ message: categoryOrError.message });
    }
    if (this.isTypeofErrors(categoryOrError, CategoryNotFoundError.name)) {
      return notFound({ message: categoryOrError.message });
    }

    const categoryFormatted = CategoryMapper.toDetails(categoryOrError);

    return ok({ data: categoryFormatted, message: null });
  }
}
