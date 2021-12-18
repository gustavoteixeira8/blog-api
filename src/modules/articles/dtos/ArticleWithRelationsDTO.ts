import { Category } from '@modules/categories/entities/Category';
import { User } from '@modules/users/entities/user/User';
import { Article } from '../entities/Article';

export interface ArticleWithRelationsDTO {
  article: Article;
  user: User;
  categories: Category[];
}
