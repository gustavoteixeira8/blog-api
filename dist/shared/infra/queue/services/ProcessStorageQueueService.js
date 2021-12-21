"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessStorageQueueService = void 0;

var _log = require("../../../log");

var _QueueProviderProtocol = require("../../../providers/queueProvider/QueueProviderProtocol");

var _StorageProviderProtocol = require("../../../providers/storageProvider/StorageProviderProtocol");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ProcessStorageQueueService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageQueueProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _StorageProviderProtocol.StorageProviderProtocol === "undefined" ? Object : _StorageProviderProtocol.StorageProviderProtocol, typeof _QueueProviderProtocol.QueueProviderProtocol === "undefined" ? Object : _QueueProviderProtocol.QueueProviderProtocol]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ProcessStorageQueueService {
  constructor(_storageProvider, _storageQueueProvider) {
    this._storageProvider = _storageProvider;
    this._storageQueueProvider = _storageQueueProvider;
  }

  execute() {
    this._storageQueueProvider.process(async job => {
      try {
        const {
          action,
          filetype,
          filename
        } = job.data;

        if (action === 'SAVE') {
          await this._storageProvider.save(filename, filetype);

          _log.logger.info('File uploaded successfully');
        } else if (action === 'DELETE') {
          await this._storageProvider.delete(filename, filetype);

          _log.logger.info('File deleted successfully');
        }
      } catch (error) {
        _log.logger.error(error);
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ProcessStorageQueueService = ProcessStorageQueueService;