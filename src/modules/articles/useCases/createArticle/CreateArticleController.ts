import { WebController } from '@shared/core/controllers/WebController';
import {
  ArticleTitleAlreadyExistsError,
  CategoryNotFoundError,
  InvalidArticleTextError,
  InvalidArticleTitleError,
  MaxOfDifferentCategoriesError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import {
  badRequest,
  created,
  forbidden,
  HttpResponse,
  notFound,
} from '@shared/core/http/HttpResponse';
import { CreateArticleUseCase } from './CreateArticleUseCase';

export class CreateArticleController extends WebController<CreateArticleUseCase> {
  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, text, isPublic, categoriesId } = httpRequest.body;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({ title, text, isPublic, categoriesId, userId });
    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      ArticleTitleAlreadyExistsError.name,
      InvalidArticleTextError.name,
      InvalidArticleTitleError.name,
      MaxOfDifferentCategoriesError.name,
    );

    if (isBadRequest) {
      return badRequest({ message: result.message });
    }

    const isForbidden = this.isTypeofErrors(
      result,
      UserEmailIsNotVerifiedError.name,
      UserIsNotAdminError.name,
    );

    if (isForbidden) {
      return forbidden({ message: result.name });
    }

    const isNotFound = this.isTypeofErrors(
      result,
      UserNotFoundError.name,
      CategoryNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    return created({ data: null, message: 'Your article was created successfully' });
  }
}
