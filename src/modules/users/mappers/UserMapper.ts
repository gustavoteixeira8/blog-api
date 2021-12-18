import { User } from '../entities/user/User';
import { UserDTO } from '../dtos/UserDTO';
import { UserProtocol } from '../entities/user/UserProtocol';
import { UserToHimself } from '../dtos/UserToHimself';
import { UserDetailsDTO } from '../dtos/UserDetailsDTO';

export class UserMapper {
  public static toPersistence(user: UserProtocol): UserDTO {
    return {
      id: user.id?.value || '',
      fullName: user.fullName.value,
      email: user.email.value,
      username: user.username.value,
      password: user.password.value,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  public static toDomain(user: UserDTO): User {
    return User.create(user);
  }

  public static toHimself(user: UserProtocol): UserToHimself {
    return {
      id: user.id?.value || '',
      fullName: user.fullName.value,
      email: user.email.value,
      username: user.username.value,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDetails(user: User): UserDetailsDTO {
    return {
      id: user.id.value,
      username: user.username.value,
    };
  }
}
