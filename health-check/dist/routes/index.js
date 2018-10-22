'use strict';

var cov_2448vcbtoi = function () {
  var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\routes\\index.js',
      hash = '342d30e2e162fb22eacd620dfa144366a1e02db7',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\routes\\index.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 15
        },
        end: {
          line: 4,
          column: 31
        }
      },
      '1': {
        start: {
          line: 5,
          column: 19
        },
        end: {
          line: 5,
          column: 29
        }
      },
      '2': {
        start: {
          line: 7,
          column: 13
        },
        end: {
          line: 26,
          column: 8
        }
      },
      '3': {
        start: {
          line: 28,
          column: 0
        },
        end: {
          line: 30,
          column: 2
        }
      },
      '4': {
        start: {
          line: 29,
          column: 1
        },
        end: {
          line: 29,
          column: 14
        }
      },
      '5': {
        start: {
          line: 31,
          column: 0
        },
        end: {
          line: 35,
          column: 2
        }
      },
      '6': {
        start: {
          line: 32,
          column: 15
        },
        end: {
          line: 32,
          column: 63
        }
      },
      '7': {
        start: {
          line: 33,
          column: 18
        },
        end: {
          line: 33,
          column: 101
        }
      },
      '8': {
        start: {
          line: 33,
          column: 72
        },
        end: {
          line: 33,
          column: 99
        }
      },
      '9': {
        start: {
          line: 34,
          column: 1
        },
        end: {
          line: 34,
          column: 19
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 28,
            column: 26
          },
          end: {
            line: 28,
            column: 27
          }
        },
        loc: {
          start: {
            line: 28,
            column: 46
          },
          end: {
            line: 30,
            column: 1
          }
        },
        line: 28
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 31,
            column: 25
          },
          end: {
            line: 31,
            column: 26
          }
        },
        loc: {
          start: {
            line: 31,
            column: 45
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 31
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 33,
            column: 28
          },
          end: {
            line: 33,
            column: 29
          }
        },
        loc: {
          start: {
            line: 33,
            column: 72
          },
          end: {
            line: 33,
            column: 99
          }
        },
        line: 33
      }
    },
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
    f: {
      '0': 0,
      '1': 0,
      '2': 0
    },
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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _HealthCare = require('../trader-connector/HealthCare');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_2448vcbtoi.s[0]++, _express2.default.Router());
var healthcare = (cov_2448vcbtoi.s[1]++, _HealthCare.HealthCare);

var html = (cov_2448vcbtoi.s[2]++, '\n<html><head>\n  <meta http-equiv="content-type" content="text/html; charset=UTF-8">\n  <title>Highcharts Demo</title>\n  <meta http-equiv="content-type" content="text/html; charset=UTF-8">\n  <meta name="robots" content="noindex, nofollow">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style type="text/css">\n  body {\n  background: #fff;\n}\n  </style>\n</head>\n<body>\n\n<script src="chart.js"></script>\n<div id="container" style="height: 400px; min-width: 310px"></div>\n  \n</body>\n</html>');

cov_2448vcbtoi.s[3]++;
router.get('/index.html', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cov_2448vcbtoi.f[0]++;
            cov_2448vcbtoi.s[4]++;

            res.end(html);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
cov_2448vcbtoi.s[5]++;
router.get('/data.json', function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var audit, min_data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cov_2448vcbtoi.f[1]++;
            cov_2448vcbtoi.s[6]++;
            _context2.next = 4;
            return healthcare.raw(req.query.last_create_time);

          case 4:
            audit = _context2.sent;
            min_data = (cov_2448vcbtoi.s[7]++, audit.map(function (_ref3) {
              var upload = _ref3.upload,
                  download = _ref3.download,
                  create_time = _ref3.create_time,
                  id = _ref3.id;
              cov_2448vcbtoi.f[2]++;
              cov_2448vcbtoi.s[8]++;
              return [create_time, download, id];
            }));
            cov_2448vcbtoi.s[9]++;

            res.json(min_data);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;