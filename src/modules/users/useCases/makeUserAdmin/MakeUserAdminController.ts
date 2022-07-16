import { MakeUserAdminUseCase } from './MakeUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class MakeUserAdminController extends WebController<MakeUserAdminUseCase> {
  async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { userId: adminId } = httpRequest.userData;

    const makeUserAdminResponse = await this._useCase.execute({ adminId, userId });
    const isBadRequest = this.isTypeofErrors(makeUserAdminResponse, MissingParamError.name);

    if (isBadRequest) {
      return badRequest({ message: makeUserAdminResponse.message });
    }

    const isNotFound = this.isTypeofErrors(makeUserAdminResponse, UserNotFoundError.name);

    if (isNotFound) {
      return notFound({ message: makeUserAdminResponse.message });
    }

    const isForbidden = this.isTypeofErrors(
      makeUserAdminResponse,
      UserIsNotAdminError.name,
      UserEmailIsNotVerifiedError.name,
    );

    if (isForbidden) {
      return forbidden({ message: makeUserAdminResponse.message });
    }

    return ok({
      message: 'You have given admin permission to a new user successfully',
      data: null,
    });
  }
}
