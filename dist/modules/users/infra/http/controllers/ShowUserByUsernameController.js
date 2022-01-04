"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowUserByUsernameController = void 0;

var _UserMapper = require("../../../mappers/UserMapper");

var _ShowUserByUsernameUseCase = require("../../../useCases/ShowUserByUsernameUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class ShowUserByUsernameController {
  async handle(req, res) {
    const {
      userId
    } = req.userData;
    const {
      username
    } = req.params;

    const showUser = _tsyringe.container.resolve(_ShowUserByUsernameUseCase.ShowUserByUsernameUseCase);

    const user = await showUser.execute({
      username
    });
    let userFormatted;

    if (user.id.value === userId) {
      userFormatted = _UserMapper.UserMapper.toHimself(user);
    } else {
      userFormatted = _UserMapper.UserMapper.toDetails(user);
    }

    return (0, _httpResponses.ok)(res, {
      user: userFormatted
    });
  }

}

exports.ShowUserByUsernameController = ShowUserByUsernameController;