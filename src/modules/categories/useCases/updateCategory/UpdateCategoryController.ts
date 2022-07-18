import { UpdateCategoryUseCase } from './UpdateCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  CategoryNameAlreadyExistsError,
  CategoryNotFoundError,
  InvalidCategoryNameError,
  InvalidSlugError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class UpdateCategoryController extends WebController<UpdateCategoryUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body;
    const { categoryId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ name, categoryId, userId });

    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      CategoryNameAlreadyExistsError.name,
      InvalidCategoryNameError.name,
      InvalidSlugError.name,
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
      return forbidden({ message: result.name });
    }

    return ok({ data: null, message: 'Category was updated successfully' });
  }
}
