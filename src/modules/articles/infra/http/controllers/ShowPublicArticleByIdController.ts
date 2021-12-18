import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowPublicArticleByIdUseCase } from '@modules/articles/useCases/ShowPublicArticleByIdUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowPublicArticleByIdController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { articleId } = req.params;

    const showArticle = container.resolve(ShowPublicArticleByIdUseCase);

    const article = await showArticle.execute({ articleId });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok(res, { article: articleFormatted });
  }
}
