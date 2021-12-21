"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailConfig = void 0;
const mailConfig = {
  mailtrap: {
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY
  }
};
exports.mailConfig = mailConfig;