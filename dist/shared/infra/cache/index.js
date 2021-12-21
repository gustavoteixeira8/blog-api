"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedisProvider = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisProvider {
  get client() {
    return this._client;
  }

  constructor(options) {
    this._client = void 0;
    this._client = new _ioredis.default(options);
  }

  static connect(options) {
    if (!this._instance) {
      this._instance = new RedisProvider(options);

      this._instance.defineEvents();
    }

    return this._instance;
  }

  disconnect(reconnect = false) {
    if (this._client) {
      this._client.disconnect(reconnect);

      RedisProvider._instance = null;
    }
  }

  defineEvents() {
    if (this._client) {
      this._client.on('error', error => {
        this.disconnect(false);
        throw new Error(error);
      });
    }
  }

}

exports.RedisProvider = RedisProvider;
RedisProvider._instance = null;