"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftDeleteUserController = void 0;

var _SoftDeleteUserUseCase = require("../../../useCases/SoftDeleteUserUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class SoftDeleteUserController {
  async handle(req, res) {
    const {
      userId
    } = req.userData;

    const deleteUser = _tsyringe.container.resolve(_SoftDeleteUserUseCase.SoftDeleteUserUseCase);

    await deleteUser.execute({
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your user will be deleted in 1 month'
    });
  }

}

exports.SoftDeleteUserController = SoftDeleteUserController;