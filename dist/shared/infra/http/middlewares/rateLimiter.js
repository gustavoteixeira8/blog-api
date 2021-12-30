"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultLimiter = exports.authRoutesSlowDown = exports.authRoutesLimiter = void 0;

var _cache = require("../../../../config/cache");

var _httpErrors = require("../errors/httpErrors");

var _cache2 = require("../../cache");

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _expressSlowDown = _interopRequireDefault(require("express-slow-down"));

var _rateLimitRedis = _interopRequireDefault(require("rate-limit-redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisProvider = _cache2.RedisProvider.connect(_cache.cacheConfig.redis);

const authRoutesLimiter = (0, _expressRateLimit.default)({
  store: new _rateLimitRedis.default({
    client: redisProvider.client,
    prefix: 'auth-routes-limit:'
  }),
  max: 15,
  windowMs: 1000 * 60 * 5,
  draft_polli_ratelimit_headers: true,
  statusCode: 429,

  handler() {
    throw new _httpErrors.TooManyRequestsError('Too many requests coming from the same IP, try again in a few moments');
  }

});
exports.authRoutesLimiter = authRoutesLimiter;
const authRoutesSlowDown = (0, _expressSlowDown.default)({
  store: new _rateLimitRedis.default({
    client: redisProvider.client,
    prefix: 'auth-routes-slow-down:'
  }),
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
  windowMs: 1000 * 60 * 5,
  delayAfter: 3,
  delayMs: Math.floor(Math.random() * 2000),
  maxDelayMs: 1000 * 60
});
exports.authRoutesSlowDown = authRoutesSlowDown;
const defaultLimiter = (0, _expressRateLimit.default)({
  store: new _rateLimitRedis.default({
    client: redisProvider.client,
    prefix: 'default-limit:'
  }),
  max: 1000,
  windowMs: 1000 * 60 * 3,
  draft_polli_ratelimit_headers: true,
  statusCode: 429,

  handler() {
    throw new _httpErrors.TooManyRequestsError('Too many requests coming from the same IP, try again in a few moments');
  }

});
exports.defaultLimiter = defaultLimiter;