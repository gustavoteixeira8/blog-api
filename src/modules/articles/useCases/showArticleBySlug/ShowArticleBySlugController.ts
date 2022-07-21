import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowArticleBySlugUseCase } from './ShowArticleBySlugUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  MissingParamError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class ShowArticleBySlugController extends WebController<ShowArticleBySlugUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    let userId = '';

    if (httpRequest.userData) {
      userId = httpRequest.userData.userId;
    }

    const { articleSlug } = httpRequest.params;

    const articleOrError = await this._useCase.execute({ articleSlug, userId });

    const isBadRequest = this.isTypeofErrors(articleOrError, MissingParamError.name);

    if (isBadRequest) {
      return badRequest({ message: articleOrError.message });
    }

    const isNotFound = this.isTypeofErrors(
      articleOrError,
      UserNotFoundError.name,
      ArticleNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: articleOrError.message });
    }

    const isForbidden = this.isTypeofErrors(
      articleOrError,
      UserIsNotAdminError.name,
      ArticleIsNotYoursError.name,
    );

    if (isForbidden) {
      return forbidden({ message: articleOrError.message });
    }

    const articleFormatted = ArticleMapper.toDetails(articleOrError, true);

    return ok({ message: null, data: articleFormatted });
  }
}
