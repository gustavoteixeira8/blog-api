"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitStatus = void 0;

require("reflect-metadata");

require("dotenv/config");

require("../../containers");

var _tsyringe = require("tsyringe");

var _ProcessMailQueueService = require("./services/ProcessMailQueueService");

var _ProcessStorageQueueService = require("./services/ProcessStorageQueueService");

var _log = require("../../log");

let ExitStatus;
exports.ExitStatus = ExitStatus;

(function (ExitStatus) {
  ExitStatus[ExitStatus["success"] = 0] = "success";
  ExitStatus[ExitStatus["error"] = 1] = "error";
})(ExitStatus || (exports.ExitStatus = ExitStatus = {}));

process.on('uncaughtException', error => {
  _log.logger.error(`Queue exited with error -> ${error}`);

  process.exit(ExitStatus.error);
});
process.on('unhandledRejection', error => {
  _log.logger.error(`Queue exited with error -> ${error}`);

  process.exit(ExitStatus.error);
});

(function () {
  try {
    const processMailQueueService = _tsyringe.container.resolve(_ProcessMailQueueService.ProcessMailQueueService);

    const processStorageQueueService = _tsyringe.container.resolve(_ProcessStorageQueueService.ProcessStorageQueueService);

    processMailQueueService.execute();
    processStorageQueueService.execute();
    const quitSignal = ['SIGQUIT', 'SIGTERM', 'SIGINT'];
    quitSignal.forEach(signal => {
      process.on(signal, async () => {
        try {
          _log.logger.info(`Queue exited with success`);

          process.exit(ExitStatus.success);
        } catch (error) {
          _log.logger.error(`Queue exited with error -> ${error}`);

          process.exit(ExitStatus.error);
        }
      });
    });

    _log.logger.info('Running queue');
  } catch (error) {
    _log.logger.error(`Queue exited with error -> ${error}`);
  }
})();