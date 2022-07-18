import { SoftDeleteArticleUseCase } from './SoftDeleteArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class SoftDeleteArticleController extends WebController<SoftDeleteArticleUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ userId, articleId });

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

    return ok({ data: null, message: 'Your article will be deleted in 1 month' });
  }
}
