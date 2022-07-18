import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  badRequest,
  created,
  forbidden,
  HttpResponse,
  notFound,
} from '@shared/core/http/HttpResponse';
import {
  CategoryNameAlreadyExistsError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
  InvalidCategoryNameError,
  InvalidSlugError,
} from '@shared/core/errors';

export class CreateCategoryController extends WebController<CreateCategoryUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ name, userId });

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

    const isNotFound = this.isTypeofErrors(result, UserNotFoundError.name);

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

    return created({ message: 'Category was successfully created', data: null });
  }
}
