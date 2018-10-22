"use strict";

var cov_xwoc8r0nm = function () {
  var path = "C:\\Users\\michael\\Documents\\lme\\health-check\\Build_Deploy.js",
      hash = "9ed28a1b34e269ee2ec9f3dfe4a7d63c1a2f2175",
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "C:\\Users\\michael\\Documents\\lme\\health-check\\Build_Deploy.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();