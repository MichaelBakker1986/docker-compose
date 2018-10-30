'use strict';

var cov_2nw4xmuz6j = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\hot_deploy.js',
	    hash = '5a16273683deda7bda96c72e066835c32bbf21dc',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\hot_deploy.js',
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
					line: 11,
					column: 25
				},
				end: {
					line: 11,
					column: 61
				}
			},
			'3': {
				start: {
					line: 12,
					column: 20
				},
				end: {
					line: 12,
					column: 50
				}
			},
			'4': {
				start: {
					line: 14,
					column: 19
				},
				end: {
					line: 14,
					column: 53
				}
			},
			'5': {
				start: {
					line: 15,
					column: 17
				},
				end: {
					line: 15,
					column: 55
				}
			},
			'6': {
				start: {
					line: 17,
					column: 2
				},
				end: {
					line: 19,
					column: 4
				}
			},
			'7': {
				start: {
					line: 18,
					column: 3
				},
				end: {
					line: 18,
					column: 92
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
						line: 20,
						column: 2
					}
				},
				line: 9
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 17,
						column: 32
					},
					end: {
						line: 17,
						column: 33
					}
				},
				loc: {
					start: {
						line: 17,
						column: 38
					},
					end: {
						line: 19,
						column: 3
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
			'7': 0
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
exports.HotDeploy = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _CodeBuilder = require('./CodeBuilder');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotClient = require('webpack-hot-client');

var _webpackHotClient2 = _interopRequireDefault(_webpackHotClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var codeBuilder = (cov_2nw4xmuz6j.s[0]++, new _CodeBuilder.CodeBuilder());

var HotDeploy = exports.HotDeploy = function HotDeploy(server, hot_path) {
	(0, _classCallCheck3.default)(this, HotDeploy);
	cov_2nw4xmuz6j.f[0]++;

	var filename = (cov_2nw4xmuz6j.s[1]++, _path2.default.basename(hot_path));

	var _ref = (cov_2nw4xmuz6j.s[2]++, 'http://localhost:10500/' + filename),
	    publicPath = _ref.publicPath;

	var file_path = (cov_2nw4xmuz6j.s[3]++, _path2.default.join(__dirname, hot_path));

	var compiler = (cov_2nw4xmuz6j.s[4]++, codeBuilder.getCompiler(file_path));
	var client = (cov_2nw4xmuz6j.s[5]++, (0, _webpackHotClient2.default)(compiler, { reload: false }));

	cov_2nw4xmuz6j.s[6]++;
	client.server.on('listening', function () {
		cov_2nw4xmuz6j.f[1]++;
		cov_2nw4xmuz6j.s[7]++;

		server.use((0, _webpackDevMiddleware2.default)(compiler, { name: filename, publicPath: publicPath, dynamicPublicPath: true }));
	});
};