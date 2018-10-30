'use strict';

var cov_2h8jpvr6q2 = function () {
	var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\IDE_code_builder.js',
	    hash = '39ed4df587b0b9f0a32f423af14d559ff8e7d765',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\mbakk\\Documents\\fesjs\\lme-model-api\\src\\IDE_code_builder.js',
		statementMap: {
			'0': {
				start: {
					line: 4,
					column: 23
				},
				end: {
					line: 4,
					column: 47
				}
			},
			'1': {
				start: {
					line: 8,
					column: 1
				},
				end: {
					line: 8,
					column: 41
				}
			},
			'2': {
				start: {
					line: 9,
					column: 1
				},
				end: {
					line: 9,
					column: 46
				}
			},
			'3': {
				start: {
					line: 10,
					column: 1
				},
				end: {
					line: 10,
					column: 48
				}
			},
			'4': {
				start: {
					line: 13,
					column: 0
				},
				end: {
					line: 13,
					column: 37
				}
			},
			'5': {
				start: {
					line: 13,
					column: 18
				},
				end: {
					line: 13,
					column: 36
				}
			}
		},
		fnMap: {
			'0': {
				name: 'go',
				decl: {
					start: {
						line: 7,
						column: 15
					},
					end: {
						line: 7,
						column: 17
					}
				},
				loc: {
					start: {
						line: 7,
						column: 20
					},
					end: {
						line: 11,
						column: 1
					}
				},
				line: 7
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 13,
						column: 11
					},
					end: {
						line: 13,
						column: 12
					}
				},
				loc: {
					start: {
						line: 13,
						column: 18
					},
					end: {
						line: 13,
						column: 36
					}
				},
				line: 13
			}
		},
		branchMap: {},
		s: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0
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

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//AnalyseWeb.get('/:web_page.html', async ({ params = {} }, res) => res.sendFile(__dirname + `/web/${params.web_page}.html`))
var go = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						cov_2h8jpvr6q2.f[0]++;
						cov_2h8jpvr6q2.s[1]++;

						new _hot_deploy.HotDeploy(IDECodeBuilder, '/ide.js');
						cov_2h8jpvr6q2.s[2]++;
						new _hot_deploy.HotDeploy(IDECodeBuilder, '/excelide.js');
						cov_2h8jpvr6q2.s[3]++;
						new _hot_deploy.HotDeploy(IDECodeBuilder, '/uishowcase.js');

					case 7:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function go() {
		return _ref.apply(this, arguments);
	};
}();

var _hot_deploy = require('./hot_deploy');

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IDECodeBuilder = (cov_2h8jpvr6q2.s[0]++, (0, _expressPromiseRouter2.default)());cov_2h8jpvr6q2.s[4]++;


go().catch(function (err) {
	cov_2h8jpvr6q2.f[1]++;
	cov_2h8jpvr6q2.s[5]++;
	return console.error(err);
});
exports.default = IDECodeBuilder;