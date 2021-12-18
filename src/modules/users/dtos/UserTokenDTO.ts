import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';

export interface UserTokenDTO extends Partial<Pick<TimestampProtocol, 'createdAt'>> {
  readonly id?: string;
  token: string;
  type: string;
  userId: string;
  expiresIn: Date;
}
