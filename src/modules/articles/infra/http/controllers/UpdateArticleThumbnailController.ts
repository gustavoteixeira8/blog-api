import { UpdateArticleThumbnailUseCase } from '@modules/articles/useCases/UpdateArticleThumbnailUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { SharpAdapter } from '@shared/adapters/processImageAdapter/implementations/SharpAdapter';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { resolve, basename } from 'path';

export class UpdateArticleThumbnailController {
  public async handle(req: Request, res: Response): Promise<Response> {
    let thumbnail: string | undefined;

    if (req.file) {
      const sharpProvider = new SharpAdapter();
      const newPath = await sharpProvider.convertToWebp(resolve(req.file.path));
      thumbnail = basename(newPath);
    }

    const { articleId } = req.params;
    const { userId } = req.userData;

    const updateArticle = container.resolve(UpdateArticleThumbnailUseCase);

    await updateArticle.execute({
      thumbnail,
      userId,
      articleId,
    });

    return ok(res, { message: 'Your article was updated successfully' });
  }
}
