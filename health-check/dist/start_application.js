'use strict';

var cov_2jg4a0b9vg = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\start_application.js',
	    hash = '264688724f892f8685229e27b40ee3c1350f224a',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\start_application.js',
		statementMap: {
			'0': {
				start: {
					line: 4,
					column: 26
				},
				end: {
					line: 4,
					column: 101
				}
			},
			'1': {
				start: {
					line: 4,
					column: 39
				},
				end: {
					line: 4,
					column: 101
				}
			},
			'2': {
				start: {
					line: 6,
					column: 17
				},
				end: {
					line: 15,
					column: 1
				}
			},
			'3': {
				start: {
					line: 7,
					column: 1
				},
				end: {
					line: 7,
					column: 25
				}
			},
			'4': {
				start: {
					line: 8,
					column: 21
				},
				end: {
					line: 8,
					column: 74
				}
			},
			'5': {
				start: {
					line: 9,
					column: 22
				},
				end: {
					line: 9,
					column: 73
				}
			},
			'6': {
				start: {
					line: 10,
					column: 16
				},
				end: {
					line: 12,
					column: 2
				}
			},
			'7': {
				start: {
					line: 11,
					column: 2
				},
				end: {
					line: 11,
					column: 66
				}
			},
			'8': {
				start: {
					line: 13,
					column: 1
				},
				end: {
					line: 13,
					column: 39
				}
			},
			'9': {
				start: {
					line: 14,
					column: 1
				},
				end: {
					line: 14,
					column: 39
				}
			},
			'10': {
				start: {
					line: 16,
					column: 0
				},
				end: {
					line: 17,
					column: 31
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 4,
						column: 26
					},
					end: {
						line: 4,
						column: 27
					}
				},
				loc: {
					start: {
						line: 4,
						column: 39
					},
					end: {
						line: 4,
						column: 101
					}
				},
				line: 4
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 6,
						column: 17
					},
					end: {
						line: 6,
						column: 18
					}
				},
				loc: {
					start: {
						line: 6,
						column: 42
					},
					end: {
						line: 15,
						column: 1
					}
				},
				line: 6
			},
			'2': {
				name: '(anonymous_2)',
				decl: {
					start: {
						line: 10,
						column: 16
					},
					end: {
						line: 10,
						column: 17
					}
				},
				loc: {
					start: {
						line: 10,
						column: 26
					},
					end: {
						line: 12,
						column: 2
					}
				},
				line: 10
			},
			'3': {
				name: '(anonymous_3)',
				decl: {
					start: {
						line: 17,
						column: 6
					},
					end: {
						line: 17,
						column: 7
					}
				},
				loc: {
					start: {
						line: 17,
						column: 12
					},
					end: {
						line: 17,
						column: 14
					}
				},
				line: 17
			},
			'4': {
				name: '(anonymous_4)',
				decl: {
					start: {
						line: 17,
						column: 22
					},
					end: {
						line: 17,
						column: 23
					}
				},
				loc: {
					start: {
						line: 17,
						column: 28
					},
					end: {
						line: 17,
						column: 30
					}
				},
				line: 17
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
			'10': 0
		},
		f: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0
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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _log = require('log6');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_2jg4a0b9vg.s[0]++;


var remove_line_break = function remove_line_break(message) {
	cov_2jg4a0b9vg.f[0]++;
	cov_2jg4a0b9vg.s[1]++;
	return message.toString().substring(0, message.toString().length - 1);
};

cov_2jg4a0b9vg.s[2]++;
var run_prom = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, command) {
		var _ref2, _ref3, cmd, rest, childProcess, logger;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						cov_2jg4a0b9vg.f[1]++;
						cov_2jg4a0b9vg.s[3]++;

						(0, _log.info)('Start ' + command);
						_ref2 = (cov_2jg4a0b9vg.s[4]++, [command.split(' ')[0], command.split(' ').splice(1)]), _ref3 = (0, _slicedToArray3.default)(_ref2, 2), cmd = _ref3[0], rest = _ref3[1];
						childProcess = (cov_2jg4a0b9vg.s[5]++, (0, _child_process.spawn)(cmd, rest, { capture: ['stdout', 'stderr'] }));
						cov_2jg4a0b9vg.s[6]++;

						logger = function logger(data) {
							cov_2jg4a0b9vg.f[2]++;
							cov_2jg4a0b9vg.s[7]++;

							console.log('[' + name.padStart(10) + '] ' + remove_line_break(data));
						};

						cov_2jg4a0b9vg.s[8]++;

						childProcess.stdout.on('data', logger);
						cov_2jg4a0b9vg.s[9]++;
						childProcess.stderr.on('data', logger);

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function run_prom(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();
cov_2jg4a0b9vg.s[10]++;
Promise.all([run_prom('api', 'node ./dist/bin/www'), run_prom('speed_job', 'node ./dist/trader-connector/ThuisSpeedTest')]).then(function () {
	cov_2jg4a0b9vg.f[3]++;
}).catch(function () {
	cov_2jg4a0b9vg.f[4]++;
});