import { MakeUserAdminUseCase } from './MakeUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class MakeUserAdminController extends WebController {
  constructor(useCase: MakeUserAdminUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { userId: adminId } = httpRequest.userData;

    await this._useCase.execute({ adminId, userId });

    return ok({
      message: 'You have given admin permission to a new user successfully',
      data: null,
    });
  }
}
