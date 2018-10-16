'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _FFLToRegister = require('./FFLToRegister');

var _lmeCore = require('lme-core');

function ScorecardTool() {
	this.on = false;
}

var defaultValue = {
	visible: {
		undefined: true,
		'1.0': true,
		'1': true,
		'true': true,
		'On': true
	},
	locked: {
		'0.0': true,
		'0': true,
		'false': true,
		'Off': true,
		'No': true
	},
	required: {
		undefined: true,
		'0.0': true,
		'0': true,
		'false': true,
		'No': true,
		'Off': true
	}
};
ScorecardTool.prototype.parse = function (input) {
	var _this = this;

	var indexer = new _lmeCore.Register();
	var model = new _FFLToRegister.FFLToRegister(indexer, input);
	model.parseProperties();
	this.childIndex = indexer.schemaIndexes.children;
	var requiredIndex = indexer.schemaIndexes.required;
	var nameIndex = indexer.schemaIndexes.name;
	var formulaIndex = indexer.schemaIndexes.formula;
	var rIndex = indexer.schemaIndexes.index;

	var scorecards = indexer.find('displaytype', 'scorecard');
	var adjustments = [];
	for (var i = 0; i < scorecards.length; i++) {
		var completeFilledIn = [];
		var scorecard = scorecards[i];
		var steps = scorecard[indexer.schemaIndexes.children];

		var _loop = function _loop() {
			var requiredvars = [];
			var mapVar = steps[j];
			_this.walkDepthFirst(mapVar, function (node, depth) {
				if (!defaultValue.required[node[requiredIndex]]) {
					requiredvars.push(node);
				}
			}, 0);
			if (requiredvars.length > 0) {
				var _validFormula = '[AMMOUNT(' + requiredvars.map(function (variable) {
					return variable[nameIndex] + '.required and ' + variable[nameIndex] + '.entered';
				}).join(',') + '),AMMOUNT(' + requiredvars.map(function (variable) {
					return variable[nameIndex] + '.required';
				}).join(',') + ')]';

				adjustments.push({
					index: mapVar[nameIndex],
					property: 'valid',
					value: _validFormula
				});
				completeFilledIn = completeFilledIn.concat(requiredvars);
			}
		};

		for (var j = 0; j < steps.length; j++) {
			_loop();
		}
		if (completeFilledIn.length > 0) {
			var validFormula = 'AMMOUNT(' + completeFilledIn.map(function (variable) {
				return variable[nameIndex] + '.required and ' + variable[nameIndex] + '.entered';
			}).join(',') + ')  = AMMOUNT(' + completeFilledIn.map(function (variable) {
				return variable[nameIndex] + '.required';
			}).join(',') + ')';

			adjustments.push({
				index: scorecard[nameIndex],
				property: 'formula',
				value: validFormula
			});
		}
	}
	var names = indexer.getIndex('name');
	for (var adjindex = 0; adjindex < adjustments.length; adjindex++) {
		var adjustment = adjustments[adjindex];
		indexer.value(names[adjustment.index][rIndex], adjustment.property, adjustment.value);
	}
	return indexer;
};
ScorecardTool.prototype.walkDepthFirst = function (node, visitor, depth) {
	var children = node[this.childIndex];
	for (var i = 0; i < children.length; i++) {
		this.walkDepthFirst(children[i], visitor, depth + 1);
	}
	visitor(node, depth);
};
exports.default = ScorecardTool;