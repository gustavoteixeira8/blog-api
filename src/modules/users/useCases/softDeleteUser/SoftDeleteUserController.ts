import { SoftDeleteUserUseCase } from './SoftDeleteUserUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserNotFoundError,
} from '@shared/core/errors';

export class SoftDeleteUserController extends WebController {
  constructor(useCase: SoftDeleteUserUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ userId });

    if (this.isTypeofErrors(result, MissingParamError.name)) {
      return badRequest({ message: result.message });
    }

    if (this.isTypeofErrors(result, UserNotFoundError.name)) {
      return notFound({ message: result.message });
    }

    if (this.isTypeofErrors(result, UserEmailIsNotVerifiedError.name)) {
      return forbidden({ message: result.message });
    }

    return ok({ message: 'Your user will be deleted in 1 month', data: null });
  }
}
