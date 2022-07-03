import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { ArticleRepositoryProtocol } from '../../repositories/ArticleRepositoryProtocol';

export class DeleteAllArticlesUseCase implements UseCaseProtocol<void, Promise<void>> {
  constructor(
    private readonly _articleRepository: ArticleRepositoryProtocol,
    private readonly _dateAdapter: DateAdapterProtocol,
  ) {}

  public async execute(): Promise<void> {
    const articles = await this._articleRepository.findAllDeleted();

    for (const article of articles) {
      if (!article.deletedAt) continue;

      const deletedAtPlusOneMonth = this._dateAdapter.add(article.deletedAt, { months: 1 });

      if (deletedAtPlusOneMonth.getTime() < Date.now()) continue;

      await this._articleRepository.delete(article.id.value);
    }
  }
}
