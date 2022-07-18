import { UpdateArticleUseCase } from './UpdateArticleUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  ArticleTitleAlreadyExistsError,
  CategoryNotFoundError,
  InvalidArticleTextError,
  InvalidArticleTitleError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export class UpdateArticleController extends WebController<UpdateArticleUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, text, isPublic, categoriesId } = httpRequest.body;
    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({
      title,
      text,
      isPublic,
      categoriesId,
      userId,
      articleId,
    });

    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      ArticleTitleAlreadyExistsError.name,
      InvalidArticleTextError.name,
      InvalidArticleTitleError.name,
    );

    if (isBadRequest) {
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
      CategoryNotFoundError.name,
      UserNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    return ok({ data: null, message: 'Your article was updated successfully' });
  }
}
