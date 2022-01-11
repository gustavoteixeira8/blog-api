"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsConfig = void 0;

var _httpErrors = require("../shared/infra/http/errors/httpErrors");

const allowedDomains = ['https://gustavo.gq'];
const corsConfig = {
  origin: (origin, cb) => {
    if (!allowedDomains.includes(origin || 'WRONG_ORIGIN')) {
      cb(new _httpErrors.UnauthorizedError('Not allowed by CORS'));
      return;
    }

    cb(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};
exports.corsConfig = corsConfig;