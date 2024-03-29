import { UpdateArticleThumbnailUseCase } from './UpdateArticleThumbnailUseCase';
import { resolve, basename } from 'path';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { badRequest, forbidden, HttpResponse, notFound, ok } from '@shared/core/http/HttpResponse';
import {
  ArticleIsNotYoursError,
  ArticleNotFoundError,
  InvalidImageNameError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';
import { ProcessImageAdapterProtocol } from '@shared/adapters/processImageAdapter/ProcessImageAdapterProtocol';

export class UpdateArticleThumbnailController extends WebController<UpdateArticleThumbnailUseCase> {
  private _processImage: ProcessImageAdapterProtocol;

  constructor(useCase: UpdateArticleThumbnailUseCase, processImage: ProcessImageAdapterProtocol) {
    super(useCase);
    this._processImage = processImage;
  }

  protected async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    let thumbnail: string | undefined;

    if (httpRequest.file) {
      const newPath = await this._processImage.convertToWebp(resolve(httpRequest.file.path));
      thumbnail = basename(newPath);
    }

    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    const result = await this._useCase.execute({
      thumbnail,
      userId,
      articleId,
    });

    const isBadRequest = this.isTypeofErrors(
      result,
      MissingParamError.name,
      InvalidImageNameError.name,
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
      UserNotFoundError.name,
    );

    if (isNotFound) {
      return notFound({ message: result.message });
    }

    return ok({ data: null, message: 'Your article was updated successfully' });
  }
}
