import { ArticleMapper } from '@modules/articles/mappers/ArticleMapper';
import { SearchArticlesForUserCreatorUseCase } from '@modules/users/useCases/SearchArticlesForUserCreatorUseCase';
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
  public async handle(req: Request, res: Response): Promise<Response> {
    const { categoryName, articleTitle, isPublic, isDeleted, order, page, perPage } = req.query;
    const { userId } = req.userData;

    const orderFormatted = resolveOrderByParams(order as string);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });
    const stringsFormatted = resolveSearchParamsStrings({ categoryName, articleTitle });
    const boolFormatted = resolveSearchParamsBoolean({ isPublic, isDeleted });

    const searchForCreator = container.resolve(SearchArticlesForUserCreatorUseCase);

    const result = await searchForCreator.execute({
      userId,
      categoryName: stringsFormatted.categoryName,
      articleTitle: stringsFormatted.articleTitle,
      isDeleted: boolFormatted.isDeleted,
      isPublic: boolFormatted.isPublic,
      order: orderFormatted,
      page: numbersFormatted.page,
      perPage: numbersFormatted.perPage,
    });

    const articlesFormatted = result.data.map((article) => ArticleMapper.toDetails(article, false));

    return ok(res, { articles: { ...result, data: articlesFormatted } });
  }
}
