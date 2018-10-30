'use strict';

var cov_8q23m5zjy = function () {
  var path = 'C:\\Users\\mbakk\\Documents\\fesjs\\traefik\\src\\index.js',
      hash = '7ce5287b592fd8e8074d9771c9452cb939f32065',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\mbakk\\Documents\\fesjs\\traefik\\src\\index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndpointCreator = undefined;

var _EndpointCreator = require('./EndpointCreator');

exports.EndpointCreator = _EndpointCreator.EndpointCreator;