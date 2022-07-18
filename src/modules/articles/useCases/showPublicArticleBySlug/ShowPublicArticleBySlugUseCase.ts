import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { ArticleNotFoundError, MissingParamError } from '@shared/core/errors';
import { ArticleWithRelationsDTO } from '../../dtos/ArticleWithRelationsDTO';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';

export interface ShowArticleBySlugRequest {
  articleSlug: string;
}

export type ShowArticleBySlugResponse = Promise<
  ArticleWithRelationsDTO | ArticleNotFoundError | MissingParamError
>;

export class ShowPublicArticleBySlugUseCase
  implements UseCaseProtocol<ShowArticleBySlugRequest, ShowArticleBySlugResponse>
{
  constructor(private readonly _articleRepository: ArticleRepositoryProtocol) {}

  public async execute({ articleSlug }: ShowArticleBySlugRequest): ShowArticleBySlugResponse {
    if (!articleSlug) return new MissingParamError('Article slug');

    const article = await this._articleRepository.findPublicBySlugWithRelations(articleSlug, {
      withDeleted: false,
    });

    if (!article) return new ArticleNotFoundError();

    return article;
  }
}
