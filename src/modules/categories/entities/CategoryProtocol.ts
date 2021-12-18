import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { CategoryName } from '@shared/core/entities/valueObjects/CategoryName';
import { Identifier } from '@shared/core/entities/valueObjects/Identifier';
import { Slug } from '@shared/core/entities/valueObjects/Slug';

export interface CategoryProtocol extends Omit<TimestampProtocol, 'deletedAt'> {
  readonly id?: Identifier;
  name: CategoryName;
  slug: Slug;
}
