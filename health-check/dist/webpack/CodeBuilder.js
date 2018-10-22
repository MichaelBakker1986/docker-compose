'use strict';

var cov_1psabi5vxe = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\webpack\\CodeBuilder.js',
	    hash = '316b7a80b656f4e5f1bedcdf9ff80483a1fcd774',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\webpack\\CodeBuilder.js',
		statementMap: {
			'0': {
				start: {
					line: 5,
					column: 18
				},
				end: {
					line: 5,
					column: 32
				}
			},
			'1': {
				start: {
					line: 6,
					column: 18
				},
				end: {
					line: 6,
					column: 20
				}
			},
			'2': {
				start: {
					line: 13,
					column: 19
				},
				end: {
					line: 13,
					column: 47
				}
			},
			'3': {
				start: {
					line: 14,
					column: 17
				},
				end: {
					line: 14,
					column: 41
				}
			},
			'4': {
				start: {
					line: 15,
					column: 2
				},
				end: {
					line: 43,
					column: 3
				}
			},
			'5': {
				start: {
					line: 16,
					column: 3
				},
				end: {
					line: 40,
					column: 5
				}
			},
			'6': {
				start: {
					line: 41,
					column: 3
				},
				end: {
					line: 41,
					column: 40
				}
			},
			'7': {
				start: {
					line: 42,
					column: 3
				},
				end: {
					line: 42,
					column: 38
				}
			},
			'8': {
				start: {
					line: 44,
					column: 2
				},
				end: {
					line: 44,
					column: 33
				}
			},
			'9': {
				start: {
					line: 48,
					column: 2
				},
				end: {
					line: 48,
					column: 44
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
						column: 15
					},
					end: {
						line: 10,
						column: 2
					}
				},
				line: 9
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 12,
						column: 1
					},
					end: {
						line: 12,
						column: 2
					}
				},
				loc: {
					start: {
						line: 12,
						column: 32
					},
					end: {
						line: 45,
						column: 2
					}
				},
				line: 12
			},
			'2': {
				name: '(anonymous_2)',
				decl: {
					start: {
						line: 47,
						column: 1
					},
					end: {
						line: 47,
						column: 2
					}
				},
				loc: {
					start: {
						line: 47,
						column: 28
					},
					end: {
						line: 49,
						column: 2
					}
				},
				line: 47
			}
		},
		branchMap: {
			'0': {
				loc: {
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 43,
						column: 3
					}
				},
				type: 'if',
				locations: [{
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 43,
						column: 3
					}
				}, {
					start: {
						line: 15,
						column: 2
					},
					end: {
						line: 43,
						column: 3
					}
				}],
				line: 15
			}
		},
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
		b: {
			'0': [0, 0]
		},
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
exports.CodeBuilder = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memory_fs = (cov_1psabi5vxe.s[0]++, new _memoryFs2.default());
var compilers = (cov_1psabi5vxe.s[1]++, {});

var CodeBuilder = exports.CodeBuilder = function () {
	function CodeBuilder() {
		(0, _classCallCheck3.default)(this, CodeBuilder);
		cov_1psabi5vxe.f[0]++;
	}

	(0, _createClass3.default)(CodeBuilder, [{
		key: 'resolveCompiler',
		value: function resolveCompiler(absolute_path) {
			cov_1psabi5vxe.f[1]++;

			var basename = (cov_1psabi5vxe.s[2]++, _path2.default.basename(absolute_path));
			var compiler = (cov_1psabi5vxe.s[3]++, compilers[absolute_path]);
			cov_1psabi5vxe.s[4]++;
			if (!compiler) {
				cov_1psabi5vxe.b[0][0]++;
				cov_1psabi5vxe.s[5]++;

				compiler = (0, _webpack2.default)({
					context: __dirname,
					entry: {
						chart: [absolute_path]
					},
					mode: 'development',
					node: {
						fs: 'empty',
						child_process: 'empty'
					},
					output: {
						filename: basename
					},
					module: {
						rules: [{
							test: /\.js$/,
							include: [_path2.default.join(__dirname, 'client')],
							exclude: /node_modules/,
							loader: 'babel-loader'
						}]
					},
					plugins: [new _webpack2.default.NamedModulesPlugin()]
				});
				cov_1psabi5vxe.s[6]++;
				compiler.outputFileSystem = memory_fs;
				cov_1psabi5vxe.s[7]++;
				compilers[absolute_path] = compiler;
			} else {
				cov_1psabi5vxe.b[0][1]++;
			}
			cov_1psabi5vxe.s[8]++;
			return compilers[absolute_path];
		}
	}, {
		key: 'getCompiler',
		value: function getCompiler(absolute_path) {
			cov_1psabi5vxe.f[2]++;
			cov_1psabi5vxe.s[9]++;

			return this.resolveCompiler(absolute_path);
		}
	}]);
	return CodeBuilder;
}();