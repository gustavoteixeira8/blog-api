"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyUserEmailController = void 0;

var _VerifyUserEmailUseCase = require("../../../useCases/VerifyUserEmailUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class VerifyUserEmailController {
  async handle(req, res) {
    const {
      token
    } = req.params;

    const verifyEmail = _tsyringe.container.resolve(_VerifyUserEmailUseCase.VerifyUserEmailUseCase);

    await verifyEmail.execute({
      token
    });
    return (0, _httpResponses.ok)(res, {
      message: 'Your email was successfully verified'
    });
  }

}

exports.VerifyUserEmailController = VerifyUserEmailController;