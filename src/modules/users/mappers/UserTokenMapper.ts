import { UserToken } from '../entities/userToken/UserToken';
import { UserTokenDTO } from '../dtos/UserTokenDTO';
import { UserTokenProtocol } from '../entities/userToken/UserTokenProtocol';

export class UserTokenMapper {
  public static toPersistence(userToken: UserTokenProtocol): UserTokenDTO {
    return {
      id: userToken.id?.value,
      token: userToken.token.value,
      type: userToken.type,
      userId: userToken.userId.value,
      expiresIn: userToken.expiresIn,
      createdAt: userToken.createdAt,
    };
  }

  public static toDomain(userToken: UserTokenDTO): UserToken {
    const newUserToken = UserToken.create(userToken);

    if (newUserToken instanceof Error) {
      return {} as UserToken;
    }

    return newUserToken;
  }
}
