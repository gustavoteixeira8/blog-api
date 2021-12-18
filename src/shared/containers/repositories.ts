import { ArticleRepositoryProtocol } from '@modules/articles/repositories/ArticleRepositoryProtocol';
import { ArticleRepositoryOrm } from '@modules/articles/repositories/implementations/ArticleRepositoryOrm';
import { CategoryRepositoryProtocol } from '@modules/categories/repositories/CategoryRepositoryProtocol';
import { CategoryRepositoryOrm } from '@modules/categories/repositories/implementations/CategoryRepositoryOrm';
import { UserRepositoryOrm } from '@modules/users/repositories/implementations/UserRepositoryOrm';
import { UserTokenRepositoryOrm } from '@modules/users/repositories/implementations/UserTokenRepositoryOrm';
import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { UserTokenRepositoryProtocol } from '@modules/users/repositories/UserTokenRepositoryProtocol';
import { container } from 'tsyringe';

container.registerSingleton<UserRepositoryProtocol>('UserRepository', UserRepositoryOrm);
container.registerSingleton<UserTokenRepositoryProtocol>(
  'UserTokenRepository',
  UserTokenRepositoryOrm,
);
container.registerSingleton<CategoryRepositoryProtocol>(
  'CategoryRepository',
  CategoryRepositoryOrm,
);
container.registerSingleton<ArticleRepositoryProtocol>('ArticleRepository', ArticleRepositoryOrm);
