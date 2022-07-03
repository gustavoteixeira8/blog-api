import { RecoverArticleUseCase } from './RecoverArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';

export class RecoverArticleController extends WebController {
  constructor(useCase: RecoverArticleUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ articleId, userId });

    return ok({ message: 'Your article was recovered successfully', data: null });
  }
}
