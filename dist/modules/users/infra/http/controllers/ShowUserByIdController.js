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
    } = req.params;

    const showUser = _tsyringe.container.resolve(_ShowUserByIdUseCase.ShowUserByIdUseCase);

    const user = await showUser.execute({
      userId
    });

    const userDetails = _UserMapper.UserMapper.toDetails(user);

    return (0, _httpResponses.ok)(res, {
      user: userDetails
    });
  }

}

exports.ShowUserByIdController = ShowUserByIdController;