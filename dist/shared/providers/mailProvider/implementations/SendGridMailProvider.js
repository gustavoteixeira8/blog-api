"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendGridMailProvider = void 0;

var _app = require("../../../../config/app");

var _mail = require("../../../../config/mail");

var _mail2 = _interopRequireDefault(require("@sendgrid/mail"));

var _log = require("../../../log");

var _HandlebarsProvider = require("../../templateProvider/implementations/HandlebarsProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SendGridMailProvider {
  constructor() {
    _defineProperty(this, "_apiKey", _mail.mailConfig.sendGrid.apiKey);

    _defineProperty(this, "_appAddress", _app.appConfig.mail);

    _mail2.default.setApiKey(this._apiKey);
  }

  async sendMail(options) {
    try {
      const handlebars = new _HandlebarsProvider.HandlebarsProvider();
      const htmlParsed = await handlebars.parse({
        file: options.html,
        variables: options.context
      });
      await _mail2.default.send({
        from: {
          email: options.from?.address || this._appAddress.address,
          name: options.from?.name || this._appAddress.name
        },
        to: {
          email: options.to.address,
          name: options.to.name
        },
        subject: options.subject,
        html: htmlParsed,
        attachments: options.attachments?.map(a => ({
          content: a.content,
          filename: a.filename,
          type: a.contentType
        })),
        replyTo: options.replyTo || this._appAddress.address
      });
    } catch (error) {
      _log.logger.error(error);

      throw new Error('Mail service error');
    }
  }

}

exports.SendGridMailProvider = SendGridMailProvider;