"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailTrapProvider = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mail = require("../../../../config/mail");

var _HandlebarsProvider = require("../../templateProvider/implementations/HandlebarsProvider");

var _app = require("../../../../config/app");

var _log = require("../../../log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MailTrapProvider {
  constructor() {
    this._mailerConfig = _mail.mailConfig.mailtrap;
    this._appAddress = _app.appConfig.mail;
  }

  async sendMail(options) {
    const transporter = _nodemailer.default.createTransport(this._mailerConfig);

    try {
      const handlebars = new _HandlebarsProvider.HandlebarsProvider();
      const htmlParsed = await handlebars.parse({
        file: options.html,
        variables: options.context
      });
      await transporter.sendMail({
        from: options.from || this._appAddress,
        to: options.to,
        subject: options.subject,
        html: htmlParsed,
        attachments: options.attachments,
        replyTo: options.replyTo
      });
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Mail service error');
    }
  }

}

exports.MailTrapProvider = MailTrapProvider;