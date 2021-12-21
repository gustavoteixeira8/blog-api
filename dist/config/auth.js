"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = void 0;
const authConfig = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY
  }
};
exports.authConfig = authConfig;