import { RecoverArticleUseCase } from './RecoverArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class RecoverArticleController extends WebController<RecoverArticleUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ articleId, userId });

    if (this.isTypeofErrors(result, MissingParamError.name)) {
      return badRequest({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(
      result,
      ArticleIsNotYoursError.name,
      UserIsNotAdminError.name,
      UserEmailIsNotVerifiedError.name,
    );

    if (isForbidden) {
      return forbidden({ message: result.message });
    }

    const isNotFound = this.isTypeofErrors(
      result,
      ArticleNotFoundError.name,
      UserNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    return ok({ message: 'Your article was recovered successfully', data: null });
  }
}
