import { UserRepositoryProtocol } from '@modules/users/repositories/UserRepositoryProtocol';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { MiddlewareResponse, WebMiddleware } from '@shared/core/middlewares/WebMiddleware';
import { ForbiddenError } from '../../errors/httpErrors';

export class EnsureAdminMiddleware implements WebMiddleware {
  constructor(private _userRepository: UserRepositoryProtocol) {}

  public async handleMiddleware(httpRequest: HttpRequest): Promise<MiddlewareResponse> {
    const { userId } = httpRequest.userData;

    const user = await this._userRepository.findById(userId, { withDeleted: false });

    if (!user || !user.isAdmin || !user.isEmailVerified) {
      return new ForbiddenError('You do not have access to this feature');
    }

    return {};
  }
}
