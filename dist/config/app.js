"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appConfig = void 0;
const appConfig = {
  serverPort: process.env.SERVER_PORT || 3000,
  url: 'http://localhost:3000',
  name: process.env.APP_NAME,
  mail: {
    address: process.env.APP_MAIL,
    name: process.env.APP_NAME
  }
};
exports.appConfig = appConfig;