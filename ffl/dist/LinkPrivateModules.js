'use strict';

var _child_process = require('child_process');

var _log = require('log6');

['lme-core'].forEach(function (module) {
	(0, _child_process.exec)('npm link ../' + module, function (err, stdout) {
		if (err) return (0, _log.error)(err);
		(0, _log.info)(stdout);
	});
});