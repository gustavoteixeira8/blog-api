import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowArticleForUserCreatorUseCase } from '@modules/articles/useCases/ShowArticleForUserCreatorUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowArticleForUserCreatorController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { articleId } = req.params;
    const { userId } = req.userData;

    const showArticle = container.resolve(ShowArticleForUserCreatorUseCase);

    const article = await showArticle.execute({ articleId, userId });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok(res, { article: articleFormatted });
  }
}
