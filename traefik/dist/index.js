'use strict';

var cov_kni6txv5h = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\traefik\\src\\index.js',
	    hash = '3dd7e999e2c4a1cd0e7f5c4185b7238592ed4a9c',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\traefik\\src\\index.js',
		statementMap: {
			'0': {
				start: {
					line: 5,
					column: 15
				},
				end: {
					line: 5,
					column: 31
				}
			},
			'1': {
				start: {
					line: 7,
					column: 22
				},
				end: {
					line: 7,
					column: 43
				}
			},
			'2': {
				start: {
					line: 8,
					column: 0
				},
				end: {
					line: 8,
					column: 34
				}
			},
			'3': {
				start: {
					line: 9,
					column: 0
				},
				end: {
					line: 9,
					column: 32
				}
			},
			'4': {
				start: {
					line: 10,
					column: 0
				},
				end: {
					line: 10,
					column: 33
				}
			},
			'5': {
				start: {
					line: 12,
					column: 0
				},
				end: {
					line: 15,
					column: 2
				}
			},
			'6': {
				start: {
					line: 13,
					column: 1
				},
				end: {
					line: 13,
					column: 26
				}
			},
			'7': {
				start: {
					line: 14,
					column: 1
				},
				end: {
					line: 14,
					column: 13
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 12,
						column: 16
					},
					end: {
						line: 12,
						column: 17
					}
				},
				loc: {
					start: {
						line: 12,
						column: 36
					},
					end: {
						line: 15,
						column: 1
					}
				},
				line: 12
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
			'7': 0
		},
		f: {
			'0': 0
		},
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

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _DockerInstanceManager = require('./DockerInstanceManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_kni6txv5h.s[0]++, _express2.default.Router());

var endpointCreator = (cov_kni6txv5h.s[1]++, new _DockerInstanceManager.EndpointCreator());
cov_kni6txv5h.s[2]++;
endpointCreator.addDummyEndpoint();
cov_kni6txv5h.s[3]++;
endpointCreator.buildEndpoints();
cov_kni6txv5h.s[4]++;
endpointCreator.bringServicesUp();

cov_kni6txv5h.s[5]++;
router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						cov_kni6txv5h.f[0]++;
						cov_kni6txv5h.s[6]++;

						endpointCreator.killAll();
						cov_kni6txv5h.s[7]++;
						res.json({});

					case 5:
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

exports.default = router;