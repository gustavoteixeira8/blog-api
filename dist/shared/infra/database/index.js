"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeConnectionDatabase = closeConnectionDatabase;
exports.connectDatabase = connectDatabase;

var _database = require("../../../config/database");

var _typeorm = require("typeorm");

async function connectDatabase() {
  await (0, _typeorm.createConnection)(_database.databaseConfig.postgres);
}

async function closeConnectionDatabase() {
  const connectionManager = new _typeorm.ConnectionManager();
  connectionManager.connections.forEach(async connection => await connection.close());
}