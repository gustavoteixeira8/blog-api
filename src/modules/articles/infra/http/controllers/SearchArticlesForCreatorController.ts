import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchArticlesForUserCreatorUseCase } from '@modules/articles/useCases/SearchArticlesForUserCreatorUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsBoolean,
  resolveSearchParamsNumbers,
  resolveSearchParamsStrings,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SearchArticlesForUserCreatorController {
  public async handle(req: Request, res: Response): Promise<Response | void> {
    const { order, page, perPage, categorySlug, articleTitle, isPublic, withDeleted } = req.query;
    const { userId } = req.userData;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });
    const stringsFormatted = resolveSearchParamsStrings({ categorySlug, articleTitle });
    const boolFormatted = resolveSearchParamsBoolean({ isPublic, withDeleted });

    const searchArticles = container.resolve(SearchArticlesForUserCreatorUseCase);

    const result = await searchArticles.execute({
      userId,
      categorySlug: stringsFormatted.categorySlug,
      title: stringsFormatted.articleTitle,
      isPublic: boolFormatted.isPublic,
      withDeleted: boolFormatted.withDeleted,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { articles: { ...result, data: articlesFormatted } });
  }
}
