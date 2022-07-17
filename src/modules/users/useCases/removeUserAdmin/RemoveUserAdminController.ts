import { RemoveUserAdminUseCase } from './RemoveUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class RemoveUserAdminController extends WebController<RemoveUserAdminUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { userId: adminId } = httpRequest.userData;

    const removeUserAdminResponse = await this._useCase.execute({ adminId, userId });
    const isBadRequest = this.isTypeofErrors(removeUserAdminResponse, MissingParamError.name);

    if (isBadRequest) {
      return badRequest({ message: removeUserAdminResponse.message });
    }

    const isNotFound = this.isTypeofErrors(removeUserAdminResponse, UserNotFoundError.name);

    if (isNotFound) {
      return notFound({ message: removeUserAdminResponse.message });
    }

    const isForbidden = this.isTypeofErrors(
      removeUserAdminResponse,
      UserIsNotAdminError.name,
      UserEmailIsNotVerifiedError.name,
    );

    if (isForbidden) {
      return forbidden({ message: removeUserAdminResponse.message });
    }

    return ok({ message: 'You have removed a user from admin successfully', data: null });
  }
}
