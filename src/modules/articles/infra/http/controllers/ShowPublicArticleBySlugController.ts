import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { ShowPublicArticleBySlugUseCase } from '@modules/articles/useCases/ShowPublicArticleBySlugUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowPublicArticleBySlugController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { articleSlug } = req.params;

    const showArticle = container.resolve(ShowPublicArticleBySlugUseCase);

    const article = await showArticle.execute({ articleSlug });

    const articleFormatted = ArticleMapper.toDetails(article, true);

    return ok(res, { article: articleFormatted });
  }
}
