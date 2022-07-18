import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  CategoryIsRelatedWithArticleError,
  CategoryNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class DeleteCategoryController extends WebController<DeleteCategoryUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categoryId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ categoryId, userId });

    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      CategoryIsRelatedWithArticleError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    const isNotFound = this.isTypeofErrors(
      result,
      UserNotFoundError.name,
      CategoryNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(
      result,
      UserIsNotAdminError.name,
      UserEmailIsNotVerifiedError.name,
    );

    if (isForbidden) {
      return forbidden({ message: result.message });
    }

    return ok({ message: 'Category was successfully deleted', data: null });
  }
}
