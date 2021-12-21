"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFnsProvider = void 0;

var _dateFns = require("date-fns");

class DateFnsProvider {
  isAfter(date, dateToCompare) {
    return (0, _dateFns.isAfter)(date, dateToCompare);
  }

  add(date, duration) {
    if (typeof date === 'string') {
      date = (0, _dateFns.parseISO)(date);
    }

    return (0, _dateFns.add)(date, duration);
  }

  format(date) {
    return (0, _dateFns.lightFormat)(date, 'yyyy-MM-dd HH:mm:ss');
  }

}

exports.DateFnsProvider = DateFnsProvider;