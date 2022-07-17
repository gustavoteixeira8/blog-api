import { UserDetailsDTO } from '@modules/users/dtos/UserDetailsDTO';
import { UserToHimself } from '@modules/users/dtos/UserToHimself';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { ShowUserByUsernameUseCase } from './ShowUserByUsernameUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { MissingParamError, UserNotFoundError } from '@shared/core/errors';

export class ShowUserByUsernameController extends WebController<ShowUserByUsernameUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;
    const { username } = httpRequest.params;

    const userOrError = await this._useCase.execute({ username });

    if (this.isTypeofErrors(userOrError, MissingParamError.name)) {
      return badRequest({ message: userOrError.message });
    }

    if (this.isTypeofErrors(userOrError, UserNotFoundError.name)) {
      return notFound({ message: userOrError.message });
    }

    let userFormatted: UserToHimself | UserDetailsDTO;

    if (userOrError.id.value === userId) {
      userFormatted = UserMapper.toHimself(userOrError);
    } else {
      userFormatted = UserMapper.toDetails(userOrError);
    }

    return ok({ message: null, data: userFormatted });
  }
}
