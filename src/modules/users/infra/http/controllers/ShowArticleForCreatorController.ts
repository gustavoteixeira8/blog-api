import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowArticleForCreatorUseCase } from '@modules/users/useCases/ShowArticleForCreatorUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowArticleForCreatorController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId } = req.userData;
    const { articleSlug } = req.params;

    const showArticle = container.resolve(ShowArticleForCreatorUseCase);

    const article = await showArticle.execute({ articleSlug, userId });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok(res, { article: articleFormatted });
  }
}
