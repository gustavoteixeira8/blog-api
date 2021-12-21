"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheConfig = void 0;
const cacheConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    autoResubscribe: false
  }
};
exports.cacheConfig = cacheConfig;