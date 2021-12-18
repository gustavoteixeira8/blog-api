import { UpdateArticleThumbnailUseCase } from '@modules/articles/useCases/UpdateArticleThumbnailUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { SharpProvider } from '@shared/providers/processImageProvider/implementations/SharpProvider';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { resolve, basename } from 'path';

export class UpdateArticleThumbnailController {
  public async handle(req: Request, res: Response): Promise<Response> {
    let thumbnail: string | undefined;

    if (req.file) {
      const sharpProvider = new SharpProvider();
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

    return ok(res, { message: 'Article thumbnail updated successfully' });
  }
}
