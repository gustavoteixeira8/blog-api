import { inject, injectable } from 'tsyringe';
import { UseCaseProtocol } from '@shared/core/useCases/UseCaseProtocol';
import { CategoryRepositoryProtocol } from '../repositories/CategoryRepositoryProtocol';
import { CategoryName } from '@shared/core/entities/valueObjects/CategoryName';
import { Slug } from '@shared/core/entities/valueObjects/Slug';
import { SlugProviderProtocol } from '@shared/providers/slugProvider/SlugProviderProtocol';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import {
  CategoryNameAlreadyExistsError,
  CategoryNotFoundError,
  InvalidCategoryNameError,
  InvalidSlugError,
  MissingParamError,
  UserEmailIsNotVerifiedError,
  UserIsNotAdminError,
  UserNotFoundError,
} from '@shared/core/errors';

export interface UpdateCategoryRequest {
  categoryId: string;
  userId: string;
  name: string;
}

@injectable()
export class UpdateCategoryUseCase
  implements UseCaseProtocol<UpdateCategoryRequest, Promise<void>>
{
  constructor(
    @inject('CategoryRepository')
    private readonly _categoryRepository: CategoryRepositoryProtocol,
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('SlugProvider')
    private readonly _slugProvider: SlugProviderProtocol,
  ) {}

  public async execute({ categoryId, name, userId }: UpdateCategoryRequest): Promise<void> {
    if (!userId) throw new MissingParamError('User id');

    if (!name || !categoryId) {
      throw new MissingParamError('Category name and category id');
    }

    const userExists = await this._userRepository.findById(userId, { withDeleted: false });

    if (!userExists) throw new UserNotFoundError();

    if (!userExists.isEmailVerified) {
      throw new UserEmailIsNotVerifiedError();
    }
    if (!userExists.isAdmin) {
      throw new UserIsNotAdminError();
    }

    const category = await this._categoryRepository.findById(categoryId);

    if (!category) throw new CategoryNotFoundError();

    const slug = this._slugProvider.generate(name);

    const categoryAlreadyExists = await this._categoryRepository.existsWithSlug(slug);

    if (categoryAlreadyExists && category.slug.value !== slug) {
      throw new CategoryNameAlreadyExistsError();
    }

    const categoryNameOrError = CategoryName.create(name);
    const slugOrError = Slug.create(slug);

    if (categoryNameOrError instanceof Error) {
      throw new InvalidCategoryNameError(name);
    }
    if (slugOrError instanceof Error) {
      throw new InvalidSlugError();
    }

    category.updateName(categoryNameOrError, slugOrError);

    await this._categoryRepository.save(category);
  }
}
