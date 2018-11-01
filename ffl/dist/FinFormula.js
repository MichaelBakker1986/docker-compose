'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function finFormulaGeneric(buf) {
	buf = buf.replace(/:/gm, ', ');
	buf = buf.replace(/(\$p|@|#|%|\.\.)/gmi, '');

	buf = buf.replace(/\[<=/gm, '[Infinity<=');
	buf = buf.replace(/\[</gm, '[Infinity<');
	buf = buf.replace(/\|</gm, '<');
	buf = buf.replace(/\[=/gm, '[');
	buf = buf.replace(/\|<=/gm, '<=');
	buf = buf.replace(/\|=/gm, '=');
	buf = buf.replace(/\|>=/gm, '>=');
	buf = buf.replace(/\|>/gm, '>');

	buf = buf.replace(/\(FirstValueT\((\w+),1,MaxT\)>0\)/gi, 'AnyDataAvailable($1)');
	buf = buf.replace(/FormulaSetInT\(GetT\(T\,-1\)\)<>NoTrend/gi, '!x.isprevnotrend');

	buf = buf.replace(/LastTinYear\(FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)\)/gi, 'x.firsttrend.lastbkyr');
	buf = buf.replace(/FirstTInFormulaset\(NoTrend\)/gi, 'x.firstnotrend');
	buf = buf.replace(/FirstTInFormulaset\(Trend\)/gi, 'x.firsttrend');
	buf = buf.replace(/FirstTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.firstnotrend');
	buf = buf.replace(/FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.firsttrend');

	buf = buf.replace(/LastTinFormulaSet\(NoTrend\)/gi, 'x.lastnotrend');
	buf = buf.replace(/LastTinFormulaSet\(Trend\)/gi, 'x.lasttrend');
	buf = buf.replace(/LastTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.lastnotrend');
	buf = buf.replace(/LastTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.lasttrend');


	buf = buf.replace(/FormulaSetInT\(LastTinPeriod\)/gi, 'x.lastinperiod');
	buf = buf.replace(/FormulaSetInT\(FirstTinPeriod\)/gi, 'x.firstinperiod');

	buf = buf.replace(/\[LastTinPeriod\(PeriodInT\)]/gi, '[lastinperiod]');
	buf = buf.replace(/\LastTinPeriod\(PeriodInT\)/gi, 'x.lastinperiod');
	buf = buf.replace(/LastTinYear\(T-TsY\)/gi, 'x.prevbkyear');

	buf = buf.replace(/\[1]/g, '[doc]');
	buf = buf.replace(/\[T]/g, '');
	buf = buf.replace(/\[GetT\(T,-1\)]/gi, '[prev]');
	buf = buf.replace(/\[LastT\]/gi, '[lastinperiod]');

	buf = buf.replace(/ValueT\(1\)/gi, 'x.firstdetail');
	buf = buf.replace(/GetT\(T,-TsY,0,TsY\)/gi, 'x.prevbkyr');
	buf = buf.replace(/GetT\(T,-1\)/gi, 'x.prev');
	buf = buf.replace(/GetT(T,-1,1,1)/gi, 'x.prev');
	buf = buf.replace(/\(MaxT\)/g, '(x.last)');
	buf = buf.replace(/TsY\(LastTinPeriod\)/gi, 'TsY');
	buf = buf.replace(/TsY\(T\)/gi, 'x.tsy');
	buf = buf.replace(/\[0\]/g, '.title ');

	buf = buf.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 ');
	buf = buf.replace(/\(\s*not /gim, '(!');
	buf = buf.replace(/^\s*&/gm, '');

	buf = buf.replace(/&/gmi, '+');
	buf = buf.replace(/ And /gmi, '&&');
	buf = buf.replace(/\)\s*and\s*\(/gmi, ')&&(');

	buf = buf.replace(/\s*&&not\s*/gmi, '&& !');
	buf = buf.replace(/\||\s+or /gmi, ' || ');
	buf = buf.replace(/ Or /gmi, ' || ');
	buf = buf.replace(/\)\s*or\s*\(/gim, ')||(');

	buf = buf.replace(/=/gm, '==');
	buf = buf.replace(/<==/gm, '<=');
	buf = buf.replace(/>==/gm, '>=');
	buf = buf.replace(/<>/gm, '!=');
	buf = buf.replace(/<->/gm, '!=');
	buf = buf.replace(/ Implies /g, '&&');
	buf = buf.replace(/ mod /g, ' % ');

	return buf;
}

function javaScriptToFinGeneric(buf) {
	buf = buf.replace(/!=/gm, '<>');

	buf = buf.replace(/==/gm, '=');
	buf = buf.replace(/\|\|/gmi, ' | ');
	buf = buf.replace(/&&/gmi, ' & ');
	return buf;
}

function finChoice(formula) {
	formula = formula.replace(/\\''$/g, '\'');

	if (/^[a-z0-9_ ]+$/i.test(formula)) {
		return formula + '.choices';
	} else if (formula.indexOf('|') < 0 && formula.indexOf(':') < 0) {
			var cleanslice = formula.slice(1, -1);
			return '[{ "name": "' + cleanslice + '", "value": "' + cleanslice + '" }]';
		} else if (formula.indexOf(':') < 0) {
				var split = formula.split('|');

				split[0] = split[0].slice(1);
				split[split.length - 1] = split[split.length - 1].slice(0, -1);

				split = split.map(function (e, idx) {
					return '{ "name": "' + idx + '" ,"value":' + (e ? '"' + e + '"' : null) + '}';
				});
				return '[' + split.join(',') + ']';
			} else {
					formula = formula.trim().slice(1, -1);
					var choices = formula.replace(/'/gmi, '');
					choices = choices.replace(/: /g, ':');
					choices = choices.replace(/:/gmi, '\" , \"value\" : \"');
					choices = choices.replace(/\|/gmi, '\"} , { \"name\" :\"');
					return '[{ "name" : "' + choices + '" }]';
				}
}

function FinFormula() {}

FinFormula.prototype.toJavascriptChoice = function (choiceObjectString) {
	var choiceObject = JSON.parse(choiceObjectString.replace(/'/gmi, '"'));
	var response = '';
	for (var i = 0; i < choiceObject.length; i++) {
		var choiceItem = choiceObject[i];
		if (i !== 0) {
			response += '|';
		}
		response += choiceItem.name + '|' + choiceItem.value;
	}
	return response;
};

FinFormula.prototype.finFormulaGeneric = finFormulaGeneric;
FinFormula.prototype.javaScriptToFinGeneric = javaScriptToFinGeneric;
FinFormula.prototype.parseFormula = finFormulaGeneric;
FinFormula.prototype.finChoice = finChoice;

FinFormula.prototype.fixCasing = function (buf) {
	return buf.replace(/[^\w]{1}(Q_\w*)/gmi, function ($1) {
		return $1.toUpperCase();
	});
};
exports.default = new FinFormula();