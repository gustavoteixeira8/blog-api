"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendUpdatePasswordEmailController = void 0;

var _SendUpdatePasswordEmailUseCase = require("../../../useCases/SendUpdatePasswordEmailUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class SendUpdatePasswordEmailController {
  async handle(req, res) {
    const {
      email
    } = req.body;

    const sendEmail = _tsyringe.container.resolve(_SendUpdatePasswordEmailUseCase.SendUpdatePasswordEmailUseCase);

    await sendEmail.execute({
      email
    });
    return (0, _httpResponses.ok)(res, {
      message: 'If the email exists in the database and is not verified, you will receive an email'
    });
  }

}

exports.SendUpdatePasswordEmailController = SendUpdatePasswordEmailController;