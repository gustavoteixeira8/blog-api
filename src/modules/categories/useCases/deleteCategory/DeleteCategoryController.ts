import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class DeleteCategoryController extends WebController {
  constructor(useCase: DeleteCategoryUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { categoryId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ categoryId, userId });

    return ok({ message: 'Category was successfully deleted', data: null });
  }
}
