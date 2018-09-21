'use strict';

var _log = require('log6');

var _log2 = _interopRequireDefault(_log);

var _ = require('../');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('../exchange_modules/screendefinition/screendefparser');

require('../exchange_modules/ffl/RegisterPlainFFLDecorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//just let it inject into the FESFacade
var data = {
	name: 'root',
	displaytype: 'SectionAnswerType',
	modelName: 'SCORECARDTESTMODEL',
	children: [{
		name: 'Q_ROOT',
		displaytype: 'ListAnswerType',
		datatype: 'number',
		frequency: 'document',
		formula: 'If( (Q_MAP01==1)&&(Q_MAP02==1)&&(Q_MAP03==1)&&(Q_MAP04==1)&&(Q_MAP05==1)&&(Q_MAP06==1)&&(Q_MAP07==1&&Q_MAP08==1) || (Length ( Q_WARNING_GLOBALTXT)>0) , 1, 0)',
		data_options: 'unscalable',
		title: '\'Scorecard Test Model\'',
		choices: '[{ "name" : " 0" , "value" : "Onvolledig ingevuld."} , { "name" :"1" , "value" : "Volledig ingevuld." }]',
		hint: '\'Dit is een model om de scorecard applicatie te testen.\'',
		locked: 'On',
		visible: '1',
		options_title: 'locked',
		options_notrend: 'locked',
		options_trend: 'locked',
		children: [{
			name: 'Q_MAP01',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '(Q_MAP01_ENTEREDREQUIREDVARS==Q_MAP01_REQUIREDVARS)',
			data_options: 'unscalable',
			title: '\'Map 1\'',
			choices: '[{ "name" : " 0" , "value" : "Onvolledig ingevuld."} , { "name" :"1" , "value" : "Volledig ingevuld." }]',
			hint: '\'t\'',
			top_blanklines: '1',
			locked: 'On',
			visible: '1',
			options_title: 'locked',
			options_notrend: 'locked',
			options_trend: 'locked',
			children: [{
				name: 'Q_MAP01_WARNING',
				displaytype: 'StringAnswerType',
				datatype: 'string',
				frequency: 'document',
				formula: 'EvaluateAsString(Q_RESTRICTIES&&Q_WARNING_GLOBAL)',
				data_options: 'unscalable',
				title: '\'Warning voor map 1\'',
				top_blanklines: '1',
				locked: 'On',
				visible: '1',
				options_title: 'locked',
				options_notrend: 'locked',
				options_trend: 'locked'
			}, {
				name: 'Q_MAP01_INFO',
				displaytype: 'StringAnswerType',
				datatype: 'string',
				frequency: 'document',
				formula: 'EvaluateAsString(If(Q_MAP01==0 , \'Nog niet alle verplichte vragen zijn ingevuld.\' , \'\'))',
				data_options: 'unscalable',
				title: '\'Info bij stap 1\'',
				locked: 'On',
				visible: '1',
				options_title: 'locked',
				options_notrend: 'locked',
				options_trend: 'locked'
			}, {
				name: 'Q_MAP01_VALIDATION',
				displaytype: 'StringAnswerType',
				datatype: 'string',
				frequency: 'document',
				data_options: 'unscalable',
				title: '\'Validatie stap 1\'',
				locked: 'On',
				visible: '1',
				options_title: 'locked',
				options_notrend: 'locked',
				options_trend: 'locked'
			}, {
				name: 'Q_MAP01_HINT',
				displaytype: 'StringAnswerType',
				datatype: 'string',
				frequency: 'document',
				formula: '\'Dit is de hinttekst van \'',
				data_options: 'unscalable',
				title: '\'Hinttekst stap 1\'',
				hint: '\'Dit is de hinttekst van de variable (DEZE REGEL WORDT NIET GEBRUIKT!)\'',
				locked: 'On',
				visible: '1',
				options_title: 'locked',
				options_notrend: 'locked',
				options_trend: 'locked'
			}, {
				name: 'Q_MAP01_Paragraaf01',
				displaytype: 'AmountAnswerType',
				datatype: 'number',
				frequency: 'document',
				title: '\'Paragraaf 1\'',
				hint: '\'Hinttekst voor paragraaf 1\'',
				visible: '1',
				options_title: 'locked',
				children: [{
					name: 'Q_MAP01_Vraag01',
					displaytype: 'StringAnswerType',
					datatype: 'string',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 1 (String)\'',
					hint: '\'Hinttekst voor vraag 1\'',
					top_blanklines: '1',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag02',
					displaytype: 'AmountAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 2 (Bedrag)\'',
					fixed_decimals: '0',
					hint: '\'Hinttekst voor vraag 2\'',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag03',
					displaytype: 'StringAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 3 (Getal, dus geen bedrag)\'',
					fixed_decimals: '0',
					hint: '\'Hinttekst voor vraag 3\'',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag04',
					displaytype: 'ListAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 4 (Keuzelijst)\'',
					choices: '[{ "name" : " 1" , "value" : "ADO Den Haag"} , { "name" :"2" , "value" : "Ajax"} , { "name" :"3" , "value" : "AZ"} , { "name" :"4" , "value" : "De Graafschap"} , { "name" :"5" , "value" : "Excelsior"} , { "name" :"6" , "value" : "Feyenoord"} , { "name" :"7" , "value" : "Groningen"} , { "name" :"8" , "value" : "Heerenveen"} , { "name" :"9" , "value" : "Heracles"} , { "name" :"10" , "value" : "NAC Breda"} , { "name" :"11" , "value" : "NEC"} , { "name" :"12" , "value" : "PSV"} , { "name" :"13" , "value" : "RKC Waalwijk"} , { "name" :"14" , "value" : "Roda JC"} , { "name" :"15" , "value" : "Twente"} , { "name" :"16" , "value" : "Utrecht"} , { "name" :"17" , "value" : "Vitesse"} , { "name" :"18" , "value" : "VVV" }]',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag05',
					displaytype: 'ListAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 5 (Keuzelijst J/N)\'',
					choices: '[{ "name" : " 0" , "value" : "Nee"} , { "name" :"1" , "value" : "Ja" }]',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag06',
					displaytype: 'PercentageAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 6 (Percentage)\'',
					fixed_decimals: '0',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag07',
					displaytype: 'TextAnswerType',
					datatype: 'number',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 7 (Datumveld)\'',
					choices: '[{ "name" : " \'dd/MM/yyyy\'", "value" : " \'dd/MM/yyyy\'" }]',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag08',
					displaytype: 'MemoAnswerType',
					datatype: 'string',
					frequency: 'document',
					formula: '\'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\'',
					data_options: 'unscalable',
					title: '\'Vraag 8 (Memoveld)\'',
					visible: '1',
					options_title: 'locked'
				}, {
					name: 'Q_MAP01_Vraag09',
					displaytype: 'StringAnswerType',
					datatype: 'string',
					frequency: 'document',
					data_options: 'unscalable',
					title: '\'Vraag 9 (Image)\'',
					visible: '1',
					options_title: 'locked'
				}]
			}]
		}, {
			name: 'Q_STATUS',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '0',
			data_options: 'unscalable',
			title: '\'Status\'',
			choices: '[{ "name" : " 0" , "value" : "Actief"} , { "name" :"1" , "value" : "Defintief" }]',
			top_blanklines: '1',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_FINAL_ON',
			displaytype: 'TextAnswerType',
			datatype: 'number',
			frequency: 'document',
			data_options: 'unscalable',
			afterinput: 'Execute((SetValue(MatrixVersion, MatrixVersion, true)))',
			choices: '[{ "name" : " \'dd/MM/yyyy\'", "value" : " \'dd/MM/yyyy\'" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_FINAL_BY',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			data_options: 'unscalable',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_FINAL_BY_NAME',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			data_options: 'unscalable',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_STARTED_ON',
			displaytype: 'TextAnswerType',
			datatype: 'number',
			frequency: 'document',
			data_options: 'unscalable',
			choices: '[{ "name" : " \'dd/MM/yyyy\'", "value" : " \'dd/MM/yyyy\'" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_STARTED_BY',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			data_options: 'unscalable',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_STATUS_STARTED_BY_NAME',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			data_options: 'unscalable',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'ModelVersion',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			formula: '\'01.19.000.000\'',
			data_options: 'saveCalculatedValue, unscalable',
			title: '\'Modelversie\'',
			locked: 'On',
			visible: '1',
			options_title: 'locked',
			options_notrend: 'locked',
			options_trend: 'locked'
		}, {
			name: 'ModelType',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			formula: '\'TEST\'',
			data_options: 'saveCalculatedValue, unscalable',
			title: '\'Modeltype\'',
			locked: 'On',
			visible: '1',
			options_title: 'locked',
			options_notrend: 'locked',
			options_trend: 'locked'
		}, {
			name: 'MatrixVersion',
			displaytype: 'StringAnswerType',
			datatype: 'string',
			frequency: 'document',
			formula: 'EvaluateAsString(MatrixLookup(\'ScorecardTestModel.xls\',\'Version\',1,3))',
			data_options: 'saveCalculatedValue, unscalable',
			title: '\'Parametersversie\'',
			hint: '\'t\'',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_PREVIOUS_BUTTON_VISIBLE',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '2',
			data_options: 'unscalable',
			title: '\'Vorige\'',
			choices: '[{ "name" : " 0" , "value" : "Nooit"} , { "name" :"2" , "value" : "Altijd" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_NEXT_BUTTON_VISIBLE',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '2',
			data_options: 'unscalable',
			title: '\'Volgende\'',
			choices: '[{ "name" : " 0" , "value" : "Nooit"} , { "name" :"1" , "value" : "Alleen wanneer stap volledig is"} , { "name" :"2" , "value" : "Altijd" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_CONCEPT_REPORT_VISIBLE',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '1',
			data_options: 'unscalable',
			title: '\'Concept rapport\'',
			choices: '[{ "name" : " 0" , "value" : "Nee"} , { "name" :"1" , "value" : "Ja" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_MAKE_FINAL_VISIBLE',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '1',
			data_options: 'unscalable',
			title: '\'Definitief maken\'',
			choices: '[{ "name" : " 0" , "value" : "Nee"} , { "name" :"1" , "value" : "Ja" }]',
			visible: '1',
			options_title: 'locked'
		}, {
			name: 'Q_FINAL_REPORT_VISIBLE',
			displaytype: 'ListAnswerType',
			datatype: 'number',
			frequency: 'document',
			formula: '1',
			data_options: 'unscalable',
			title: '\'Definitief rapport\'',
			choices: '[{ "name" : " 0" , "value" : "Nee"} , { "name" :"1" , "value" : "Ja" }]',
			visible: '1',
			options_title: 'locked'
		}]
	}]
};


var wb = new _.WorkBook(new _.Context());

function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null) {
		if (b == null) return true;
		return b.length === 0;
	}
	if (b == null) {
		if (a == null) return true;
		return a.length === 0;
	}
	return a.length === b.length;
}

_assert2.default.ok(arraysEqual(undefined, undefined));
_assert2.default.ok(arraysEqual(null, undefined));
_assert2.default.ok(arraysEqual(undefined, null));
_assert2.default.ok(arraysEqual([], null));
_assert2.default.ok(arraysEqual(undefined, []));
_assert2.default.ok(!arraysEqual([1, 2], [1]));

function validateTree(expected, actual, expectedChildrenProperty, actualChildrenProperty, equalsFunction) {
	_assert2.default.ok(equalsFunction(expected, actual));
	var expectedChildren = expected[expectedChildrenProperty];
	var actualChildren = actual[actualChildrenProperty];
	arraysEqual(expectedChildren, actualChildren);
	if (expectedChildren !== undefined && actualChildren !== undefined) {
		for (var i = 0; i < expectedChildren.length; i++) {
			validateTree(expectedChildren[i], actualChildren[i], expectedChildrenProperty, actualChildrenProperty, equalsFunction);
		}
	}
}

wb.importSolution(JSON.stringify(data, null, 2), 'screendefinition');
_assert2.default.ok(wb.validateImportedSolution().valid);
var screenDefexport = wb.export('screendefinition');
_assert2.default.notStrictEqual(screenDefexport, undefined);
_assert2.default.notStrictEqual(screenDefexport, null);
var actual = JSON.parse(wb.export('screendefinition'));
var expected = JSON.parse(JSON.stringify(data, null, 2));
validateTree(expected, actual, 'children', 'children', function (expected, actual) {
	//since variableName is optional, but leading in screenDefinition
	return actual.name === expected.variableName || expected.name;
});
if (_log2.default.TRACE) _log2.default.trace(screenDefexport);
_log2.default.debug('succes model [' + wb.getSolutionName() + ']');