import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';

export interface UserDTO extends Partial<TimestampProtocol> {
  readonly id?: string;
  fullName: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
