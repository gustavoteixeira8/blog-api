"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeBody = sanitizeBody;

var _SanitizeHtmlProvider = require("../../../providers/sanitizerProvider/implementations/SanitizeHtmlProvider");

var _tsyringe = require("tsyringe");

function sanitizeBody(req, res, next) {
  const sanitizer = _tsyringe.container.resolve(_SanitizeHtmlProvider.SanitizeHtmlProvider);

  const body = req.body;

  if (body && Object.keys(body).length) {
    for (const key in body) {
      body[key] = sanitizer.sanitize(body[key]);
    }
  }

  return next();
}