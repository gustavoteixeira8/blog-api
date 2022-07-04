import { Identifier } from '@shared/core/entities/Identifier';
import { TimestampProtocol } from '@shared/core/entities/TimestampProtocol';
import { Email } from './Email';
import { Password } from './Password';
import { PersonName } from './PersonName';
import { Username } from './Username';

export interface UserProtocol extends TimestampProtocol {
  readonly id?: Identifier;
  fullName: PersonName;
  email: Email;
  username: Username;
  password: Password;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
