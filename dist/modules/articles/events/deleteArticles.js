"use strict";

var _log = require("../../../shared/log");

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _tsyringe = require("tsyringe");

var _DeleteAllArticlesUseCase = require("../useCases/DeleteAllArticlesUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nodeCron.default.schedule('0 0 2 * * *', async () => {
  try {
    const deleteArticles = _tsyringe.container.resolve(_DeleteAllArticlesUseCase.DeleteAllArticlesUseCase);

    await deleteArticles.execute();

    _log.logger.info('Schedule to delete articles executed successfully');
  } catch (error) {
    _log.logger.error(error);
  }
});