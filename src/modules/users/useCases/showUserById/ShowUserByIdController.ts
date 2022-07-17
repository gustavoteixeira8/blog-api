import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByIdUseCase } from './ShowUserByIdUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok, badRequest, notFound } from '@shared/core/http/HttpResponse';
import { MissingParamError, UserNotFoundError } from '@shared/core/errors';

export class ShowUserByIdController extends WebController<ShowUserByIdUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;

    const userOrError = await this._useCase.execute({ userId });

    if (this.isTypeofErrors(userOrError, MissingParamError.name)) {
      return badRequest({ message: userOrError.message });
    }

    if (this.isTypeofErrors(userOrError, UserNotFoundError.name)) {
      return notFound({ message: userOrError.message });
    }

    const userFormatted = UserMapper.toHimself(userOrError);

    return ok({ message: null, data: userFormatted });
  }
}
