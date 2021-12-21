"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessMailQueueService = void 0;

var _log = require("../../../log");

var _MailProvider = require("../../../providers/mailProvider/MailProvider");

var _QueueProviderProtocol = require("../../../providers/queueProvider/QueueProviderProtocol");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ProcessMailQueueService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailQueueProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _MailProvider.MailProviderProtocol === "undefined" ? Object : _MailProvider.MailProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ProcessMailQueueService {
  constructor(_mailProvider, _mailQueueProvider) {
    this._mailProvider = _mailProvider;
    this._mailQueueProvider = _mailQueueProvider;
  }

  execute() {
    this._mailQueueProvider.process(async job => {
      try {
        const mailOptions = job.data;
        await this._mailProvider.sendMail(mailOptions);

        _log.logger.info(`Email sent to ${mailOptions.to.address}`);
      } catch (error) {
        _log.logger.error(error);
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ProcessMailQueueService = ProcessMailQueueService;