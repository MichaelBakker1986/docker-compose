'use strict';

var cov_1s0lryqffz = function () {
  var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\app.js',
      hash = '985d4f4a8f2d32cc756b4dca09bb3cca3ce95298',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\app.js',
    statementMap: {
      '0': {
        start: {
          line: 10,
          column: 12
        },
        end: {
          line: 10,
          column: 21
        }
      },
      '1': {
        start: {
          line: 12,
          column: 0
        },
        end: {
          line: 12,
          column: 59
        }
      },
      '2': {
        start: {
          line: 13,
          column: 0
        },
        end: {
          line: 13,
          column: 22
        }
      },
      '3': {
        start: {
          line: 14,
          column: 0
        },
        end: {
          line: 14,
          column: 15
        }
      },
      '4': {
        start: {
          line: 15,
          column: 0
        },
        end: {
          line: 15,
          column: 23
        }
      },
      '5': {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 48
        }
      },
      '6': {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 23
        }
      },
      '7': {
        start: {
          line: 18,
          column: 0
        },
        end: {
          line: 18,
          column: 55
        }
      },
      '8': {
        start: {
          line: 19,
          column: 0
        },
        end: {
          line: 19,
          column: 30
        }
      },
      '9': {
        start: {
          line: 21,
          column: 0
        },
        end: {
          line: 21,
          column: 25
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    },
    f: {},
    b: {},
    _coverageSchema: '43e27e138ebf9cfc5966b082cf9a028302ed4184'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressNoFavicons = require('express-no-favicons');

var _expressNoFavicons2 = _interopRequireDefault(_expressNoFavicons);

var _lmeWebpack = require('lme-webpack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (cov_1s0lryqffz.s[0]++, (0, _express2.default)());

cov_1s0lryqffz.s[1]++;
new _lmeWebpack.HotDeploy(app, _path2.default.join(__dirname, 'routes/chart.js'));
cov_1s0lryqffz.s[2]++;
app.use((0, _morgan2.default)('dev'));
cov_1s0lryqffz.s[3]++;
app.use((0, _cors2.default)());
cov_1s0lryqffz.s[4]++;
app.use(_express2.default.json());
cov_1s0lryqffz.s[5]++;
app.use(_express2.default.urlencoded({ extended: false }));
cov_1s0lryqffz.s[6]++;
app.use((0, _cookieParser2.default)());
cov_1s0lryqffz.s[7]++;
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
cov_1s0lryqffz.s[8]++;
app.use((0, _expressNoFavicons2.default)());

cov_1s0lryqffz.s[9]++;
app.use('/', _index2.default);

exports.default = app;