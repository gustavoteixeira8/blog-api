import { UserMapper } from '@modules/users/mappers/UserMapper';
import { SearchUsersUseCase } from '@modules/users/useCases/SearchUsersUseCase';
import { ok } from '@shared/infra/http/utils/httpResponses';
import {
  resolveOrderByParams,
  resolveSearchParamsBoolean,
  resolveSearchParamsNumbers,
  resolveSearchParamsStrings,
} from '@shared/infra/http/utils/resolveQueryParams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SearchUsersController {
  public async handle(req: Request, res: Response): Promise<Response | never> {
    const { userId: adminId } = req.userData;
    const { order, perPage, page, isAdmin, username } = req.query;

    const orderFormatted = resolveOrderByParams(order);
    const numbersFormatted = resolveSearchParamsNumbers({ perPage, page });
    const stringFormatted = resolveSearchParamsStrings({ username });
    const boolFormatted = resolveSearchParamsBoolean({ isAdmin });

    const searchUsers = container.resolve(SearchUsersUseCase);

    const result = await searchUsers.execute({
      adminId,
      order: orderFormatted,
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      username: stringFormatted.username,
      isAdmin: boolFormatted.isAdmin,
    });

    const usersFormatted = result.data.map(UserMapper.toHimself);

    return ok(res, { users: { ...result, data: usersFormatted } });
  }
}
