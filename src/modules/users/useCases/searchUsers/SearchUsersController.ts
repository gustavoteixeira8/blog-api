import { UserMapper } from '@modules/users/mappers/UserMapper';
import { SearchUsersUseCase } from './SearchUsersUseCase';
import { WebController } from '@shared/core/controllers/WebController';
import { HttpRequest } from '@shared/core/http/HttpRequest';
import { HttpResponse, ok } from '@shared/core/http/HttpResponse';

export class SearchUsersController extends WebController {
  constructor(useCase: SearchUsersUseCase) {
    super(useCase);
  }

  public async handleRequest(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId: adminId } = httpRequest.userData;
    const { order, perPage, page, isAdmin, username } = httpRequest.query;

    const orderFormatted = this.resolveQueryOrderBy(order);
    const numbersFormatted = this.resolveQueryNumbers({ perPage, page });
    const stringFormatted = this.resolveQueryStrings({ username });
    const boolFormatted = this.resolveQueryBoolean({ isAdmin });

    const result = await this._useCase.execute({
      adminId,
      order: orderFormatted,
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      username: stringFormatted.username,
      isAdmin: boolFormatted.isAdmin,
    });

    const usersFormatted = result.data.map(UserMapper.toHimself);

    return ok({ message: null, data: { ...result, data: usersFormatted } });
  }
}
