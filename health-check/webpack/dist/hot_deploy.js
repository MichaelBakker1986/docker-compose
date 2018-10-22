'use strict';

var cov_lt7uzgks0 = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\webpack\\hot_deploy.js',
	    hash = 'e0130409d6b65632ccc5a7e8c6f9afabbcc8303d',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\webpack\\hot_deploy.js',
		statementMap: {
			'0': {
				start: {
					line: 6,
					column: 20
				},
				end: {
					line: 6,
					column: 37
				}
			},
			'1': {
				start: {
					line: 10,
					column: 19
				},
				end: {
					line: 10,
					column: 42
				}
			},
			'2': {
				start: {
					line: 12,
					column: 19
				},
				end: {
					line: 12,
					column: 52
				}
			},
			'3': {
				start: {
					line: 13,
					column: 17
				},
				end: {
					line: 13,
					column: 55
				}
			},
			'4': {
				start: {
					line: 15,
					column: 2
				},
				end: {
					line: 18,
					column: 4
				}
			},
			'5': {
				start: {
					line: 16,
					column: 21
				},
				end: {
					line: 16,
					column: 61
				}
			},
			'6': {
				start: {
					line: 17,
					column: 3
				},
				end: {
					line: 17,
					column: 26
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 9,
						column: 1
					},
					end: {
						line: 9,
						column: 2
					}
				},
				loc: {
					start: {
						line: 9,
						column: 31
					},
					end: {
						line: 19,
						column: 2
					}
				},
				line: 9
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 15,
						column: 32
					},
					end: {
						line: 15,
						column: 33
					}
				},
				loc: {
					start: {
						line: 15,
						column: 38
					},
					end: {
						line: 18,
						column: 3
					}
				},
				line: 15
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
			'6': 0
		},
		f: {
			'0': 0,
			'1': 0
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
exports.HotDeploy = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Codebuilder = require('./Codebuilder');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotClient = require('webpack-hot-client');

var _webpackHotClient2 = _interopRequireDefault(_webpackHotClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var codeBuilder = (cov_lt7uzgks0.s[0]++, new _Codebuilder.CodeBuilder());

var HotDeploy = exports.HotDeploy = function HotDeploy(server, hot_path) {
	(0, _classCallCheck3.default)(this, HotDeploy);
	cov_lt7uzgks0.f[0]++;

	var filename = (cov_lt7uzgks0.s[1]++, _path2.default.basename(hot_path));
	/*		const { publicPath } = `http://localhost:3000/${filename}`*/
	var compiler = (cov_lt7uzgks0.s[2]++, codeBuilder.getCompiler(hot_path));
	var client = (cov_lt7uzgks0.s[3]++, (0, _webpackHotClient2.default)(compiler, { reload: false }));

	cov_lt7uzgks0.s[4]++;
	client.server.on('listening', function () {
		cov_lt7uzgks0.f[1]++;

		var middleware1 = (cov_lt7uzgks0.s[5]++, (0, _webpackDevMiddleware2.default)(compiler, { name: filename }));
		cov_lt7uzgks0.s[6]++;
		server.use(middleware1);
	});
};