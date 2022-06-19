import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { UserRepositoryProtocol } from '../repositories/UserRepositoryProtocol';
import { DateAdapterProtocol } from '@shared/adapters/dateAdapter/DateAdapterProtocol';

@injectable()
export class DeleteAllUsersUseCase implements UseCaseProtocol<void, Promise<void>> {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('DateAdapter')
    private readonly _dateAdapter: DateAdapterProtocol,
  ) {}

  public async execute(): Promise<void> {
    const users = await this._userRepository.findAllDeleted();

    for (const user of users) {
      if (!user.deletedAt) continue;

      const deletedAtPlusOneMonth = this._dateAdapter.add(user.deletedAt, { months: 1 });

      if (deletedAtPlusOneMonth.getTime() > new Date().getTime()) continue;

      await this._userRepository.delete(user.id.value);
    }
  }
}
