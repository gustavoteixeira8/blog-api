"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendVerificationEmailController = void 0;

var _SendVerificationEmailUseCase = require("../../../useCases/SendVerificationEmailUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class SendVerificationEmailController {
  async handle(req, res) {
    const {
      email
    } = req.body;

    const sendEmail = _tsyringe.container.resolve(_SendVerificationEmailUseCase.SendVerificationEmailUseCase);

    await sendEmail.execute({
      email
    });
    return (0, _httpResponses.ok)(res, {
      message: 'If the email exists in the database and is not verified, you will receive an email'
    });
  }

}

exports.SendVerificationEmailController = SendVerificationEmailController;