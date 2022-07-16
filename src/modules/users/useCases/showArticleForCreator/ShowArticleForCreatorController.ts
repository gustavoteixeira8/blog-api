import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowArticleForCreatorUseCase } from './ShowArticleForCreatorUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  ArticleNotFoundError,
  MissingParamError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class ShowArticleForCreatorController extends WebController<ShowArticleForCreatorUseCase> {
  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.userData;
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

    const isForbidden = this.isTypeofErrors(articleOrError, UserIsNotAdminError.name);

    if (isForbidden) {
      return forbidden({ message: articleOrError.message });
    }

    const articleFormatted = ArticleMapper.toDetails(articleOrError, true);

    return ok({ message: null, data: articleFormatted });
  }
}
