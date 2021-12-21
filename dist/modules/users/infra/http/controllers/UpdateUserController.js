"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserController = void 0;

var _UpdateUserUseCase = require("../../../useCases/UpdateUserUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class UpdateUserController {
  async handle(req, res) {
    const {
      fullName,
      email,
      username
    } = req.body;
    const {
      userId
    } = req.userData;

    const updateUser = _tsyringe.container.resolve(_UpdateUserUseCase.UpdateUserUseCase);

    await updateUser.execute({
      userId,
      fullName,
      email,
      username
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your user was updated successfully'
    });
  }

}

exports.UpdateUserController = UpdateUserController;