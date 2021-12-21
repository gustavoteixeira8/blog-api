"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeUserAdminController = void 0;

var _MakeUserAdminUseCase = require("../../../useCases/MakeUserAdminUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class MakeUserAdminController {
  async handle(req, res) {
    const {
      userId
    } = req.body;
    const {
      userId: adminId
    } = req.userData;

    const makeAdmin = _tsyringe.container.resolve(_MakeUserAdminUseCase.MakeUserAdminUseCase);

    await makeAdmin.execute({
      adminId,
      userId
    });
    return (0, _httpResponses.ok)(res, {
      message: 'You have given admin permission to a new user successfully'
    });
  }

}

exports.MakeUserAdminController = MakeUserAdminController;