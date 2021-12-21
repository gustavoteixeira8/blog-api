"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _AuthenticateUserUseCase = require("../../../useCases/AuthenticateUserUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class AuthenticateUserController {
  async handle(req, res) {
    const {
      login,
      password
    } = req.body;

    const authUser = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const {
      accessToken,
      expiresIn,
      userId,
      userIsRecovered
    } = await authUser.execute({
      login,
      password
    });
    return (0, _httpResponses.ok)(res, { ...(userIsRecovered ? {
        message: 'Your user was successfully recovered'
      } : null),
      accessToken,
      expiresIn,
      userId
    });
  }

}

exports.AuthenticateUserController = AuthenticateUserController;