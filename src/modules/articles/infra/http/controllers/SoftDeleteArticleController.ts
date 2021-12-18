import { SoftDeleteArticleUseCase } from '@modules/articles/useCases/SoftDeleteArticleUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SoftDeleteArticleController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { articleId } = req.params;
    const { userId } = req.userData;

    const deleteArticle = container.resolve(SoftDeleteArticleUseCase);

    await deleteArticle.execute({ userId, articleId });

    return ok(res, { message: 'Your article will be deleted in 1 month' });
  }
}
