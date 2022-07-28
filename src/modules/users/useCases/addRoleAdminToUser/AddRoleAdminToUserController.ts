import { AddRoleAdminToUserUseCase } from './AddRoleAdminToUserUseCase.ts';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class AddRoleAdminToUserController extends WebController<AddRoleAdminToUserUseCase> {
  async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { userId: adminId } = httpRequest.userData;

    const result = await this._useCase.execute({ adminId, userId });
    const isBadRequest = this.isTypeofErrors(result, MissingParamError.name);
    console.log(result);
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
      return forbidden({ message: result.message });
    }

    return ok({
      message: 'You add a new user to admins',
      data: null,
    });
  }
}
