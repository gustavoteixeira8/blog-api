import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../../repositories/CategoryRepositoryProtocol';
import { SlugAdapterProtocol } from '@shared/adapters/slugAdapter/SlugAdapterProtocol';
import { Category } from '../../entities/Category';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  CategoryNameAlreadyExistsError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
  InvalidCategoryNameError,
  InvalidSlugError,
} from '@shared/core/errors';

export interface CreateCategoryRequest {
  name: string;
  userId: string;
}

export type CreateCategoryResponse = Promise<
  | void
  | CategoryNameAlreadyExistsError
  | MissingParamError
  | UserEmailIsNotVerifiedError
  | UserIsNotAdminError
  | UserNotFoundError
  | InvalidCategoryNameError
  | InvalidSlugError
>;

export class CreateCategoryUseCase
  implements UseCaseProtocol<CreateCategoryRequest, CreateCategoryResponse>
{
  constructor(
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    private readonly _userRepository: UserRepositoryProtocol,
    private readonly _slugAdapter: SlugAdapterProtocol,
  ) {}

  public async execute({ name, userId }: CreateCategoryRequest): CreateCategoryResponse {
    if (!userId) return new MissingParamError('User id');

    if (!name) return new MissingParamError('Category name');

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) return new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      return new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      return new UserIsNotAdminError();
    }

    const slug = this._slugAdapter.generate(name);

    const categoryExists = await this._categoryRepository.existsWithSlug(slug);

    if (categoryExists) {
      return new CategoryNameAlreadyExistsError();
    }

    const categoryOrError = Category.create({ name, slug });

    if (categoryOrError instanceof Error) {
      return categoryOrError;
    }

    await this._categoryRepository.save(categoryOrError);
  }
}
