import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { ArticleText } from '@shared/core/entities/valueObjects/ArticleText';
import { ArticleTitle } from '@shared/core/entities/valueObjects/ArticleTitle';
import { ForeignKeyId } from '@shared/core/entities/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { ImageName } from '@shared/core/entities/valueObjects/ImageName';
import { Slug } from '@shared/core/entities/valueObjects/Slug';

export interface ArticleProtocol extends TimestampProtocol {
  readonly id?: Identifier;
  title: ArticleTitle;
  text: ArticleText;
  slug: Slug;
  isPublic: boolean;
  thumbnail: ImageName | null;
  userId: ForeignKeyId;
  categoriesId: ForeignKeyId[];
}
