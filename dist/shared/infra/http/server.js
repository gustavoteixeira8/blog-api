"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

require("reflect-metadata");

var _express = _interopRequireWildcard(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _http = _interopRequireDefault(require("http"));

var _app = require("../../../config/app");

var _database = require("../database");

var _index = require("./routes/index.routes");

var _errorHandler = require("./middlewares/errorHandler");

var _log = require("../../log");

var _cors2 = require("../../../config/cors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Server {
  static get instance() {
    if (!this._instance) {
      this._instance = new Server();
    }

    return this._instance;
  }

  constructor() {//

    this._app = (0, _express.default)();
    this._server = void 0;
  }

  setupRoutes() {
    this._app.use(_index.routes);

    this._app.use(_errorHandler.errorHandler);
  }

  setupMiddlewares() {
    this._app.use((0, _cors.default)(_cors2.corsConfig));

    this._app.use((0, _helmet.default)());

    this._app.use((0, _express.urlencoded)({
      extended: true
    }));

    this._app.use((0, _express.json)());
  }

  async start() {
    await (0, _database.connectDatabase)();
    this.setupMiddlewares();
    this.setupRoutes();
    this._server = _http.default.createServer(this._app);

    this._server.listen(_app.appConfig.serverPort, () => _log.logger.info('Server listening on port -> ' + _app.appConfig.serverPort));
  }

  async close() {
    await (0, _database.closeConnectionDatabase)();

    if (this._server) {
      await new Promise((resolve, reject) => {
        this._server?.close(error => error ? reject(error) : resolve(null));
      });
    }
  }

}

exports.Server = Server;
Server._instance = void 0;