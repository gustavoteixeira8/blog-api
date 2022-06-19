import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';
import { ArticleRepositoryProtocol } from '../repositories/ArticleRepositoryProtocol';

@injectable()
export class DeleteAllArticlesUseCase implements UseCaseProtocol<void, Promise<void>> {
  constructor(
    @inject('ArticleRepository')
    private readonly _articleRepository: ArticleRepositoryProtocol,
    @inject('DateAdapter')
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
