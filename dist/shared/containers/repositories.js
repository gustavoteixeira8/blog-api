"use strict";

var _ArticleRepositoryOrm = require("../../modules/articles/repositories/implementations/ArticleRepositoryOrm");

var _CategoryRepositoryOrm = require("../../modules/categories/repositories/implementations/CategoryRepositoryOrm");

var _UserRepositoryOrm = require("../../modules/users/repositories/implementations/UserRepositoryOrm");

var _UserTokenRepositoryOrm = require("../../modules/users/repositories/implementations/UserTokenRepositoryOrm");

var _tsyringe = require("tsyringe");

_tsyringe.container.registerSingleton('UserRepository', _UserRepositoryOrm.UserRepositoryOrm);

_tsyringe.container.registerSingleton('UserTokenRepository', _UserTokenRepositoryOrm.UserTokenRepositoryOrm);

_tsyringe.container.registerSingleton('CategoryRepository', _CategoryRepositoryOrm.CategoryRepositoryOrm);

_tsyringe.container.registerSingleton('ArticleRepository', _ArticleRepositoryOrm.ArticleRepositoryOrm);