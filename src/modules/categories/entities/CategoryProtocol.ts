import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { CategoryName } from '@shared/core/valueObjects/CategoryName';
import { Identifier } from '@shared/core/valueObjects/Identifier';
import { Slug } from '@shared/core/valueObjects/Slug';

export interface CategoryProtocol extends Omit<TimestampProtocol, 'deletedAt'> {
  readonly id?: Identifier;
  name: CategoryName;
  slug: Slug;
}
