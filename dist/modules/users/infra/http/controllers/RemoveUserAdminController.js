"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveUserAdminController = void 0;

var _RemoveUserAdminUseCase = require("../../../useCases/RemoveUserAdminUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class RemoveUserAdminController {
  async handle(req, res) {
    const {
      userId
    } = req.body;
    const {
      userId: adminId
    } = req.userData;

    const makeAdmin = _tsyringe.container.resolve(_RemoveUserAdminUseCase.RemoveUserAdminUseCase);

    await makeAdmin.execute({
      adminId,
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'You have removed a user from admin successfully'
    });
  }

}

exports.RemoveUserAdminController = RemoveUserAdminController;