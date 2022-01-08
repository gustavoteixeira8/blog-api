"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsConfig = void 0;

var _httpErrors = require("../shared/infra/http/errors/httpErrors");

const allowedDomains = ['https://api.gustavo.gq', 'http://localhost:3000', process.env.MY_LOCALHOST_IP];
const corsConfig = {
  origin: (origin, cb) => {
    if (origin && !allowedDomains.includes(origin)) {
      cb(new _httpErrors.UnauthorizedError('Not allowed by CORS'));
      return;
    }

    cb(null, origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};
exports.corsConfig = corsConfig;