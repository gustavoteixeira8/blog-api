import { UpdateArticleThumbnailUseCase } from './UpdateArticleThumbnailUseCase';
import { SharpAdapter } from '@shared/adapters/processImageAdapter/implementations/SharpAdapter';
import { resolve, basename } from 'path';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class UpdateArticleThumbnailController extends WebController {
  constructor(useCase: UpdateArticleThumbnailUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    let thumbnail: string | undefined;

    if (httpRequest.file) {
      const sharpProvider = new SharpAdapter();
      const newPath = await sharpProvider.convertToWebp(resolve(httpRequest.file.path));
      thumbnail = basename(newPath);
    }

    const { articleId } = httpRequest.params;
    const { userId } = httpRequest.userData;

    await this._useCase.execute({
      thumbnail,
      userId,
      articleId,
    });

    return ok({ data: null, message: 'Your article was updated successfully' });
  }
}
