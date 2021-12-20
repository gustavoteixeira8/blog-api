import { RecoverArticleUseCase } from '@modules/articles/useCases/RecoverArticleUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RecoverArticleController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { articleId } = req.params;
    const { userId } = req.userData;

    const recoverArticle = container.resolve(RecoverArticleUseCase);

    await recoverArticle.execute({ articleId, userId });

    return ok(res, { message: 'Your article was recovered successfully' });
  }
}
