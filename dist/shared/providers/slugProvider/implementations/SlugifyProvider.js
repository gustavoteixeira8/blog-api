"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlugifyProvider = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SlugifyProvider {
  constructor() {
    this._defaultSlugOptions = {
      replacement: '-',
      lower: true,
      strict: true,
      trim: true
    };
  }

  generate(s, options) {
    return (0, _slugify.default)(s, { ...(options || this._defaultSlugOptions)
    });
  }

}

exports.SlugifyProvider = SlugifyProvider;