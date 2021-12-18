import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';

export interface CategoryDTO extends Partial<Omit<TimestampProtocol, 'deletedAt'>> {
  readonly id?: string;
  name: string;
  slug: string;
}
