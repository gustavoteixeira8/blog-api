"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchUsersController = void 0;

var _UserMapper = require("../../../mappers/UserMapper");

var _SearchUsersUseCase = require("../../../useCases/SearchUsersUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _resolveQueryParams = require("../../../../../shared/infra/http/utils/resolveQueryParams");

var _tsyringe = require("tsyringe");

class SearchUsersController {
  async handle(req, res) {
    const {
      userId: adminId
    } = req.userData;
    const {
      order,
      perPage,
      page,
      isAdmin,
      username
    } = req.query;
    const orderFormatted = (0, _resolveQueryParams.resolveOrderByParams)(order);
    const numbersFormatted = (0, _resolveQueryParams.resolveSearchParamsNumbers)({
      perPage,
      page
    });
    const stringFormatted = (0, _resolveQueryParams.resolveSearchParamsStrings)({
      username
    });
    const boolFormatted = (0, _resolveQueryParams.resolveSearchParamsBoolean)({
      isAdmin
    });

    const searchUsers = _tsyringe.container.resolve(_SearchUsersUseCase.SearchUsersUseCase);

    const result = await searchUsers.execute({
      adminId,
      order: orderFormatted,
      perPage: numbersFormatted.perPage,
      page: numbersFormatted.page,
      username: stringFormatted.username,
      isAdmin: boolFormatted.isAdmin
    });
    const usersFormatted = result.data.map(_UserMapper.UserMapper.toHimself);
    return (0, _httpResponses.ok)(res, {
      users: { ...result,
        data: usersFormatted
      }
    });
  }

}

exports.SearchUsersController = SearchUsersController;