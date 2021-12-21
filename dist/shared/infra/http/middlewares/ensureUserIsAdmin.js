"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureUserIsAdmin = ensureUserIsAdmin;

var _httpErrors = require("../errors/httpErrors");

var _tsyringe = require("tsyringe");

async function ensureUserIsAdmin(req, res, next) {
  const {
    userId
  } = req.userData;

  const userRepository = _tsyringe.container.resolve('UserRepository');

  const user = await userRepository.findById(userId, {
    withDeleted: false
  });

  if (!user || !user.isAdmin || !user.isEmailVerified) {
    throw new _httpErrors.ForbiddenError('You do not have access to this feature');
  }

  return next();
}