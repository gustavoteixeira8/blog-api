"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = require("express");

var _controllers = require("../controllers");

const authRoutes = (0, _express.Router)();
exports.authRoutes = authRoutes;
authRoutes.post('/', _controllers.authenticateUserController.handle);
authRoutes.post('/email/verify', _controllers.sendVerificationEmailController.handle);
authRoutes.put('/email/verify/:token', _controllers.verifyUserEmailController.handle);
authRoutes.post('/password/forgot', _controllers.sendUpdatePasswordEmailController.handle);
authRoutes.put('/password/recover/:token', _controllers.updateUserPasswordController.handle);