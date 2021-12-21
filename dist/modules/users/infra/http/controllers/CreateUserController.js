"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _CreateUserUseCase = require("../../../useCases/CreateUserUseCase");

var _httpResponses = require("../../../../../shared/infra/http/utils/httpResponses");

var _tsyringe = require("tsyringe");

class CreateUserController {
  async handle(req, res) {
    const {
      fullName,
      email,
      password,
      username
    } = req.body;

    const createUser = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await createUser.execute({
      fullName,
      email,
      password,
      username
    });
    return (0, _httpResponses.created)(res, {
      message: 'Your user was created successfully'
    });
  }

}

exports.CreateUserController = CreateUserController;