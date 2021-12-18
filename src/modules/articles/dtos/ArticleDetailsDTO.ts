import { CategoryDetailsDTO } from '@modules/categories/dtos/CategoryDetailsDTO';
import { UserDetailsDTO } from '@modules/users/dtos/UserDetailsDTO';

export interface ArticleDetailsDTO {
  id: string;
  title: string;
  text?: string;
  slug: string;
  isPublic: boolean;
  thumbnail: string | null;
  categories: CategoryDetailsDTO[];
  user: UserDetailsDTO;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
