import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { ArticleText } from '@shared/core/valueObjects/ArticleText';
import { ArticleTitle } from '@shared/core/valueObjects/ArticleTitle';
import { ForeignKeyId } from '@shared/core/valueObjects/ForeignKeyId';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { ImageName } from '@shared/core/valueObjects/ImageName';
import { Slug } from '@shared/core/valueObjects/Slug';

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
