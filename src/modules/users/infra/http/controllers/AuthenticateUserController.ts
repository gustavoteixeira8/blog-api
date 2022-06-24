import { AuthenticateUserUseCase } from '@modules/users/useCases/AuthenticateUserUseCase';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse } from '@shared/core/http/HttpResponse';
import { WebController } from '@shared/core/controllers/WebController';
import { ok } from '@shared/core/http/HttpResponse';

export class AuthenticateUserController extends WebController {
  constructor(useCase: AuthenticateUserUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { login, password } = httpRequest.body;

    const { accessToken, expiresIn, userId, userIsRecovered } = await this._useCase.execute({
      login,
      password,
    });

    return ok({
      message: userIsRecovered ? 'Your user was successfully recovered' : null,
      data: {
        accessToken,
        expiresIn,
        userId,
      },
    });
  }
}
