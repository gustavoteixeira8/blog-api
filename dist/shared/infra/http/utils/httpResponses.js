"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = exports.noContent = exports.errorResponse = exports.created = void 0;

const created = (res, data) => {
  return res.status(201).json({
    body: data,
    status: 201
  });
};

exports.created = created;

const ok = (res, data) => {
  return res.status(200).json({
    body: data,
    status: 200
  });
};

exports.ok = ok;

const noContent = res => {
  return res.status(204).json(null);
};

exports.noContent = noContent;

const errorResponse = (res, error) => {
  return res.status(error.status).json({
    body: {
      errors: error.errors
    },
    status: error.status
  });
};

exports.errorResponse = errorResponse;