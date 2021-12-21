"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _user = require("../../../../modules/users/infra/http/routes/user.routes");

var _auth = require("../../../../modules/users/infra/http/routes/auth.routes");

var _category = require("../../../../modules/categories/infra/http/routes/category.routes");

var _article = require("../../../../modules/articles/infra/http/routes/article.routes");

var _rateLimiter = require("../middlewares/rateLimiter");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/user', _rateLimiter.defaultLimiter, _user.userRoutes).use('/auth', _rateLimiter.authRoutesSlowDown, _rateLimiter.authRoutesLimiter, _auth.authRoutes).use('/category', _rateLimiter.defaultLimiter, _category.categoryRoutes).use('/article', _rateLimiter.defaultLimiter, _article.articleRoutes);