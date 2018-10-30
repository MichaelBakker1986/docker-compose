'use strict';

var cov_wab1x7da1 = function () {
  var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\lmeAPIWrapper.js',
      hash = '8feb84817e24e8b808d48b89b3d2ed5bb6c69b16',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\lmeAPIWrapper.js',
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
    _coverageSchema: 'd34fc3e6b8297bcde183f5492bcb8fcb36775295'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _lme = require('./lme');

cov_wab1x7da1.s[0]++;


window.log = {};
var LMEMETA = (cov_wab1x7da1.s[1]++, new _lme.LmeAPI(undefined, undefined, undefined, undefined));

cov_wab1x7da1.s[2]++;
LMEMETA.importLME(global.JSON_MODEL); //JSON_MODEL is injected by browserify
cov_wab1x7da1.s[3]++;
window.LME = LMEMETA.exportWebModel();
cov_wab1x7da1.s[4]++;
window['LMEMETA'] = LMEMETA;
cov_wab1x7da1.s[5]++;
global['LMEMETA'] = LMEMETA;