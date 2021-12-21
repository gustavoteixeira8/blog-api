"use strict";

var _log = require("../../../shared/log");

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _tsyringe = require("tsyringe");

var _DeleteAllUsersUseCase = require("../useCases/DeleteAllUsersUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nodeCron.default.schedule('59 59 23 * * *', async () => {
  try {
    const deleteUsersUseCase = _tsyringe.container.resolve(_DeleteAllUsersUseCase.DeleteAllUsersUseCase);

    await deleteUsersUseCase.execute();

    _log.logger.info('Schedule to delete users executed successfully');
  } catch (error) {
    _log.logger.error(error);
  }
});