import { RemoveUserAdminUseCase } from './RemoveUserAdminUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class RemoveUserAdminController extends WebController {
  constructor(useCase: RemoveUserAdminUseCase) {
    super(useCase);
  }
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;
    const { userId: adminId } = httpRequest.userData;

    await this._useCase.execute({ adminId, userId });

    return ok({ message: 'You have removed a user from admin successfully', data: null });
  }
}
