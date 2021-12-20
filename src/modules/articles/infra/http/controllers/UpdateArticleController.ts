import { UpdateArticleUseCase } from '@modules/articles/useCases/UpdateArticleUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateArticleController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { title, text, isPublic, categoriesId } = req.body;
    const { articleId } = req.params;
    const { userId } = req.userData;

    const updateArticle = container.resolve(UpdateArticleUseCase);

    await updateArticle.execute({
      title,
      text,
      isPublic,
      categoriesId,
      userId,
      articleId,
    });

    return ok(res, { message: 'Your article was updated successfully' });
  }
}
