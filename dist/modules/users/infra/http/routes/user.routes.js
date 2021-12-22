"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _ensureAuthentication = require("../../../../../shared/infra/http/middlewares/ensureAuthentication");

var _ensureUserIsAdmin = require("../../../../../shared/infra/http/middlewares/ensureUserIsAdmin");

var _express = require("express");

var _controllers = require("../controllers");

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
userRoutes.use(_ensureAuthentication.ensureAuthentication);
userRoutes.post('/', _controllers.createUserController.handle);
userRoutes.put('/', _controllers.updateUserController.handle);
userRoutes.delete('/', _controllers.softDeleteUserController.handle);
userRoutes.get('/me', _controllers.showMeController.handle);
userRoutes.get('/:userId', _controllers.showUserByIdController.handle);
userRoutes.use(_ensureUserIsAdmin.ensureUserIsAdmin);
userRoutes.get('/', _controllers.searchUsersController.handle);
userRoutes.get('/me/article', _controllers.searchArticlesForUserCreatorController.handle);
userRoutes.put('/admin/add', _controllers.makeUserAdminController.handle);
userRoutes.put('/admin/remove', _controllers.removeUserAdminController.handle);