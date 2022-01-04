"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowUserByIdController = void 0;

var _UserMapper = require("../../../mappers/UserMapper");

var _ShowUserByIdUseCase = require("../../../useCases/ShowUserByIdUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowUserByIdController {
  async handle(req, res) {
    const {
      userId
    } = req.userData;

    const showUser = _tsyringe.container.resolve(_ShowUserByIdUseCase.ShowUserByIdUseCase);

    const user = await showUser.execute({
      userId
    });

    const userFormatted = _UserMapper.UserMapper.toHimself(user);

    return (0, _httpResponses.ok)(res, {
      user: userFormatted
    });
  }

}

exports.ShowUserByIdController = ShowUserByIdController;