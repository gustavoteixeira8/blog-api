"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitStatus = void 0;

require("reflect-metadata");

require("express-async-errors");

require("dotenv/config");

require("../../containers");

require("../../../modules/users/events/deleteUsers");

var _server = require("./server");

var _log = require("../../log");

let ExitStatus;
exports.ExitStatus = ExitStatus;

(function (ExitStatus) {
  ExitStatus[ExitStatus["success"] = 0] = "success";
  ExitStatus[ExitStatus["error"] = 1] = "error";
})(ExitStatus || (exports.ExitStatus = ExitStatus = {}));

process.on('uncaughtException', error => {
  _log.logger.error(`App exited with error -> ${error}`);

  process.exit(ExitStatus.error);
});
process.on('unhandledRejection', error => {
  _log.logger.error(`App exited with error -> ${error}`);

  process.exit(ExitStatus.error);
});

(async function () {
  try {
    const server = _server.Server.instance;
    await server.start();
    const quitSignal = ['SIGQUIT', 'SIGTERM', 'SIGINT'];
    quitSignal.forEach(signal => {
      process.on(signal, async () => {
        try {
          await server.close();

          _log.logger.info(`App exited with success`);

          process.exit(ExitStatus.success);
        } catch (error) {
          _log.logger.error(`App exited with error -> ${error}`);

          process.exit(ExitStatus.error);
        }
      });
    });
  } catch (error) {
    _log.logger.error(`App exited with error -> ${error}`);

    process.exit(ExitStatus.error);
  }
})();