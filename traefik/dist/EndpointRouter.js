'use strict';

var cov_1hf5aeog8g = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\traefik\\src\\EndpointRouter.js',
	    hash = '022ad009244190d729c75eb1a171a28f0ef0a8cd',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\traefik\\src\\EndpointRouter.js',
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
					line: 10,
					column: 0
				},
				end: {
					line: 19,
					column: 2
				}
			},
			'4': {
				start: {
					line: 11,
					column: 1
				},
				end: {
					line: 18,
					column: 2
				}
			},
			'5': {
				start: {
					line: 12,
					column: 23
				},
				end: {
					line: 12,
					column: 33
				}
			},
			'6': {
				start: {
					line: 13,
					column: 26
				},
				end: {
					line: 13,
					column: 45
				}
			},
			'7': {
				start: {
					line: 14,
					column: 2
				},
				end: {
					line: 14,
					column: 78
				}
			},
			'8': {
				start: {
					line: 15,
					column: 2
				},
				end: {
					line: 15,
					column: 53
				}
			},
			'9': {
				start: {
					line: 17,
					column: 2
				},
				end: {
					line: 17,
					column: 18
				}
			},
			'10': {
				start: {
					line: 20,
					column: 0
				},
				end: {
					line: 23,
					column: 2
				}
			},
			'11': {
				start: {
					line: 21,
					column: 1
				},
				end: {
					line: 21,
					column: 26
				}
			},
			'12': {
				start: {
					line: 22,
					column: 1
				},
				end: {
					line: 22,
					column: 13
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 10,
						column: 29
					},
					end: {
						line: 10,
						column: 30
					}
				},
				loc: {
					start: {
						line: 10,
						column: 49
					},
					end: {
						line: 19,
						column: 1
					}
				},
				line: 10
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 20,
						column: 16
					},
					end: {
						line: 20,
						column: 17
					}
				},
				loc: {
					start: {
						line: 20,
						column: 36
					},
					end: {
						line: 23,
						column: 1
					}
				},
				line: 20
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
			'9': 0,
			'10': 0,
			'11': 0,
			'12': 0
		},
		f: {
			'0': 0,
			'1': 0
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

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EndpointCreator = require('./EndpointCreator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (cov_1hf5aeog8g.s[0]++, _express2.default.Router());

var endpointCreator = (cov_1hf5aeog8g.s[1]++, new _EndpointCreator.EndpointCreator());
cov_1hf5aeog8g.s[2]++;
endpointCreator.addDummyEndpoint();

cov_1hf5aeog8g.s[3]++;
router.get('/add/:endpoint', function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var _ref2, endpoint, _ref3, _ref4, name, version;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						cov_1hf5aeog8g.f[0]++;
						cov_1hf5aeog8g.s[4]++;

						try {
							_ref2 = (cov_1hf5aeog8g.s[5]++, req.params), endpoint = _ref2.endpoint;
							_ref3 = (cov_1hf5aeog8g.s[6]++, endpoint.split(':')), _ref4 = (0, _slicedToArray3.default)(_ref3, 2), name = _ref4[0], version = _ref4[1];
							cov_1hf5aeog8g.s[7]++;

							endpointCreator.addEndPoint({ endpoint_name: name, model_version: version });
							cov_1hf5aeog8g.s[8]++;
							res.json({ message: 'created ' + name + ':' + version });
						} catch (e) {
							cov_1hf5aeog8g.s[9]++;

							console.error(e);
						}

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
cov_1hf5aeog8g.s[10]++;
router.get('/', function () {
	var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						cov_1hf5aeog8g.f[1]++;
						cov_1hf5aeog8g.s[11]++;

						endpointCreator.killAll();
						cov_1hf5aeog8g.s[12]++;
						res.json({});

					case 5:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x3, _x4) {
		return _ref5.apply(this, arguments);
	};
}());

exports.default = router;