'use strict';

var cov_u9vkb4iat = function () {
	var path = 'C:\\Users\\michael\\Documents\\lme\\health-check\\trader-connector\\TraderConnect.js',
	    hash = 'f866cd5098736bfcf88757589618f16b3c75c45c',
	    Function = function () {}.constructor,
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\michael\\Documents\\lme\\health-check\\trader-connector\\TraderConnect.js',
		statementMap: {
			'0': {
				start: {
					line: 4,
					column: 16
				},
				end: {
					line: 4,
					column: 28
				}
			},
			'1': {
				start: {
					line: 5,
					column: 11
				},
				end: {
					line: 5,
					column: 36
				}
			},
			'2': {
				start: {
					line: 6,
					column: 0
				},
				end: {
					line: 6,
					column: 44
				}
			},
			'3': {
				start: {
					line: 8,
					column: 10
				},
				end: {
					line: 13,
					column: 2
				}
			},
			'4': {
				start: {
					line: 14,
					column: 14
				},
				end: {
					line: 14,
					column: 30
				}
			},
			'5': {
				start: {
					line: 17,
					column: 1
				},
				end: {
					line: 17,
					column: 20
				}
			}
		},
		fnMap: {
			'0': {
				name: 'drain',
				decl: {
					start: {
						line: 16,
						column: 9
					},
					end: {
						line: 16,
						column: 14
					}
				},
				loc: {
					start: {
						line: 16,
						column: 17
					},
					end: {
						line: 18,
						column: 1
					}
				},
				line: 16
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
			'0': 0
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
exports.drain = exports.r = exports.audit = undefined;

var _rethinkdbdash = require('rethinkdbdash');

var _rethinkdbdash2 = _interopRequireDefault(_rethinkdbdash);

var _log = require('log6');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB_NAME = (cov_u9vkb4iat.s[0]++, 'healthcare');
var host = (cov_u9vkb4iat.s[1]++, process.env.CLOUD_DB_HOST);
cov_u9vkb4iat.s[2]++;
(0, _log.info)('Connecting to cloud database ' + host);

var r = (cov_u9vkb4iat.s[3]++, (0, _rethinkdbdash2.default)({
	servers: [{ host: host, port: 28015, db: DB_NAME }],
	pool: true,
	user: 'admin',
	timeout: 500000
}));
var audit = (cov_u9vkb4iat.s[4]++, r.table('audit'));

function drain() {
	cov_u9vkb4iat.f[0]++;
	cov_u9vkb4iat.s[5]++;

	r.getPool().drain();
}

exports.audit = audit;
exports.r = r;
exports.drain = drain;