'use strict';

var cov_1ba1mdvxtz = function () {
  var path = 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\src\\lmeAPIWrapper.js',
      hash = '1c97e7892df62ba9e1e8814581e0d7b49daf01e1',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\michael\\Documents\\lme\\lme-model-api\\src\\lmeAPIWrapper.js',
    statementMap: {
      '0': {
        start: {
          line: 3,
          column: 0
        },
        end: {
          line: 3,
          column: 15
        }
      },
      '1': {
        start: {
          line: 4,
          column: 16
        },
        end: {
          line: 4,
          column: 70
        }
      },
      '2': {
        start: {
          line: 6,
          column: 0
        },
        end: {
          line: 6,
          column: 36
        }
      },
      '3': {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 37
        }
      },
      '4': {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 27
        }
      },
      '5': {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 27
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
      '5': 0
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

var _lme = require('./lme');

cov_1ba1mdvxtz.s[0]++;


window.log = {};
var LMEMETA = (cov_1ba1mdvxtz.s[1]++, new _lme.LmeAPI(undefined, undefined, undefined, undefined));

cov_1ba1mdvxtz.s[2]++;
LMEMETA.importLME(global.JSON_MODEL); //JSON_MODEL is injected by browserify
cov_1ba1mdvxtz.s[3]++;
window.LME = LMEMETA.exportWebModel();
cov_1ba1mdvxtz.s[4]++;
window['LMEMETA'] = LMEMETA;
cov_1ba1mdvxtz.s[5]++;
global['LMEMETA'] = LMEMETA;