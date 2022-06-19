import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../repositories/CategoryRepositoryProtocol';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { Category } from '../entities/Category';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  CategoryNameAlreadyExistsError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface CreateCategoryRequest {
  name: string;
  userId: string;
}

@injectable()
export class CreateCategoryUseCase
  implements UseCaseProtocol<CreateCategoryRequest, Promise<void>>
{
  constructor(
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('SlugAdapter')
    private readonly _slugAdapter: SlugAdapterProtocol,
  ) {}

  public async execute({ name, userId }: CreateCategoryRequest): Promise<void> {
    if (!userId) throw new MissingParamError('User id');

    if (!name) throw new MissingParamError('Category name');

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) throw new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const slug = this._slugAdapter.generate(name);

    const categoryExists = await this._categoryRepository.existsWithSlug(slug);

    if (categoryExists) {
      throw new CategoryNameAlreadyExistsError();
    }

    const category = Category.create({ name, slug });

    await this._categoryRepository.save(category);
  }
}
