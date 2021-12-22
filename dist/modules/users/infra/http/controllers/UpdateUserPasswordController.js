"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserPasswordController = void 0;

var _UpdateUserPasswordUseCase = require("../../../useCases/UpdateUserPasswordUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class UpdateUserPasswordController {
  async handle(req, res) {
    const {
      password,
      confirmPassword
    } = req.body;
    const {
      token
    } = req.params;

    const updatePassword = _tsyringe.container.resolve(_UpdateUserPasswordUseCase.UpdateUserPasswordUseCase);

    await updatePassword.execute({
      token,
      password,
      confirmPassword
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your password was updated successfully'
    });
  }

}

exports.UpdateUserPasswordController = UpdateUserPasswordController;