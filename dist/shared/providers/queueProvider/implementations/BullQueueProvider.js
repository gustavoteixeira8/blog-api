"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BullQueueProvider = void 0;

var _bull = _interopRequireDefault(require("bull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BullQueueProvider {
  constructor(queueName, queueOptions) {
    _defineProperty(this, "_queue", void 0);

    this._queue = new _bull.default(queueName, queueOptions);
  }

  async add(data) {
    if (Array.isArray(data)) {
      data.map(async jobData => await this._queue.add(jobData));
      return;
    }

    await this._queue.add(data);
  }

  async process(callback) {
    await this._queue.process(callback);
  }

}

exports.BullQueueProvider = BullQueueProvider;