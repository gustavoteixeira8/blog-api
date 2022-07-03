import { SoftDeleteArticleUseCase } from './SoftDeleteArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SoftDeleteArticleController extends WebController {
  constructor(useCase: SoftDeleteArticleUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({ userId, articleId });

    return ok({ data: null, message: 'Your article will be deleted in 1 month' });
  }
}
