import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';

export interface ArticleDTO extends Partial<TimestampProtocol> {
  readonly id?: string;
  title: string;
  text: string;
  slug: string;
  isPublic: boolean;
  thumbnail: string | null;
  categoriesId: string[];
  userId: string;
}
