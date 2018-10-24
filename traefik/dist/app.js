'use strict';

var cov_2bk5catymb = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\traefik\\src\\app.js',
	    hash = 'fe1f75282b922d6cf4fef371d2a408ad4e68bbd0',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\traefik\\src\\app.js',
		statementMap: {
			'0': {
				start: {
					line: 8,
					column: 12
				},
				end: {
					line: 8,
					column: 21
				}
			},
			'1': {
				start: {
					line: 10,
					column: 0
				},
				end: {
					line: 10,
					column: 22
				}
			},
			'2': {
				start: {
					line: 11,
					column: 0
				},
				end: {
					line: 11,
					column: 15
				}
			},
			'3': {
				start: {
					line: 12,
					column: 0
				},
				end: {
					line: 12,
					column: 23
				}
			},
			'4': {
				start: {
					line: 13,
					column: 0
				},
				end: {
					line: 13,
					column: 48
				}
			},
			'5': {
				start: {
					line: 14,
					column: 0
				},
				end: {
					line: 14,
					column: 23
				}
			},
			'6': {
				start: {
					line: 15,
					column: 0
				},
				end: {
					line: 15,
					column: 30
				}
			},
			'7': {
				start: {
					line: 17,
					column: 0
				},
				end: {
					line: 17,
					column: 25
				}
			},
			'8': {
				start: {
					line: 20,
					column: 0
				},
				end: {
					line: 20,
					column: 54
				}
			},
			'9': {
				start: {
					line: 20,
					column: 30
				},
				end: {
					line: 20,
					column: 52
				}
			},
			'10': {
				start: {
					line: 23,
					column: 0
				},
				end: {
					line: 31,
					column: 2
				}
			},
			'11': {
				start: {
					line: 25,
					column: 1
				},
				end: {
					line: 25,
					column: 33
				}
			},
			'12': {
				start: {
					line: 26,
					column: 1
				},
				end: {
					line: 26,
					column: 67
				}
			},
			'13': {
				start: {
					line: 29,
					column: 1
				},
				end: {
					line: 29,
					column: 30
				}
			},
			'14': {
				start: {
					line: 30,
					column: 1
				},
				end: {
					line: 30,
					column: 17
				}
			}
		},
		fnMap: {
			'0': {
				name: '(anonymous_0)',
				decl: {
					start: {
						line: 20,
						column: 8
					},
					end: {
						line: 20,
						column: 9
					}
				},
				loc: {
					start: {
						line: 20,
						column: 28
					},
					end: {
						line: 20,
						column: 53
					}
				},
				line: 20
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 23,
						column: 8
					},
					end: {
						line: 23,
						column: 9
					}
				},
				loc: {
					start: {
						line: 23,
						column: 33
					},
					end: {
						line: 31,
						column: 1
					}
				},
				line: 23
			}
		},
		branchMap: {
			'0': {
				loc: {
					start: {
						line: 26,
						column: 20
					},
					end: {
						line: 26,
						column: 67
					}
				},
				type: 'cond-expr',
				locations: [{
					start: {
						line: 26,
						column: 59
					},
					end: {
						line: 26,
						column: 62
					}
				}, {
					start: {
						line: 26,
						column: 65
					},
					end: {
						line: 26,
						column: 67
					}
				}],
				line: 26
			},
			'1': {
				loc: {
					start: {
						line: 29,
						column: 12
					},
					end: {
						line: 29,
						column: 29
					}
				},
				type: 'binary-expr',
				locations: [{
					start: {
						line: 29,
						column: 12
					},
					end: {
						line: 29,
						column: 22
					}
				}, {
					start: {
						line: 29,
						column: 26
					},
					end: {
						line: 29,
						column: 29
					}
				}],
				line: 29
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
			'9': 0,
			'10': 0,
			'11': 0,
			'12': 0,
			'13': 0,
			'14': 0
		},
		f: {
			'0': 0,
			'1': 0
		},
		b: {
			'0': [0, 0],
			'1': [0, 0]
		},
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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressNoFavicons = require('express-no-favicons');

var _expressNoFavicons2 = _interopRequireDefault(_expressNoFavicons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (cov_2bk5catymb.s[0]++, (0, _express2.default)());

cov_2bk5catymb.s[1]++;
app.use((0, _morgan2.default)('dev'));
cov_2bk5catymb.s[2]++;
app.use((0, _cors2.default)());
cov_2bk5catymb.s[3]++;
app.use(_express2.default.json());
cov_2bk5catymb.s[4]++;
app.use(_express2.default.urlencoded({ extended: false }));
cov_2bk5catymb.s[5]++;
app.use((0, _cookieParser2.default)());
cov_2bk5catymb.s[6]++;
app.use((0, _expressNoFavicons2.default)());

cov_2bk5catymb.s[7]++;
app.use('/', _index2.default);

// catch 404 and forward to error handler
cov_2bk5catymb.s[8]++;
app.use(function (req, res, next) {
	cov_2bk5catymb.f[0]++;
	cov_2bk5catymb.s[9]++;
	next(createError(404));
});

// error handler
cov_2bk5catymb.s[10]++;
app.use(function (err, req, res, next) {
	cov_2bk5catymb.f[1]++;
	cov_2bk5catymb.s[11]++;

	// set locals, only providing error in development
	res.locals.message = err.message;
	cov_2bk5catymb.s[12]++;
	res.locals.error = req.app.get('env') === 'development' ? (cov_2bk5catymb.b[0][0]++, err) : (cov_2bk5catymb.b[0][1]++, {});

	// render the error page
	cov_2bk5catymb.s[13]++;
	res.status((cov_2bk5catymb.b[1][0]++, err.status) || (cov_2bk5catymb.b[1][1]++, 500));
	cov_2bk5catymb.s[14]++;
	res.end('error');
});

exports.default = app;