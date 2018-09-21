//http://excelformulabeautifier.com/
function finFormulaGeneric(buf) {
	/**
	 * Choices fix, this is a problem for titles and hints containing ":" chars.
	 * TODO: move to choice specific logic.
	 */
	buf = buf.replace(/:/gm, ', ')
	buf = buf.replace(/(\$p|@|#|%|\.\.)/gmi, '')

	//temp case fix, <= lt,gt,lte,gte from Cases,
	buf = buf.replace(/\[<=/gm, '[Infinity<=')
	buf = buf.replace(/\[</gm, '[Infinity<')
	buf = buf.replace(/\|</gm, '<')
	buf = buf.replace(/\[=/gm, '[')
	buf = buf.replace(/\|<=/gm, '<=')
	buf = buf.replace(/\|=/gm, '=')
	buf = buf.replace(/\|>=/gm, '>=')
	buf = buf.replace(/\|>/gm, '>')
	//end temp case fix

	/**
	 * Here are all time references
	 the same as hasAnyValue? HasValue(var) ?
	 */
	buf = buf.replace(/\(FirstValueT\((\w+),1,MaxT\)>0\)/gi, 'AnyDataAvailable($1)')//regular test for any data entered
	buf = buf.replace(/FormulaSetInT\(GetT\(T\,-1\)\)<>NoTrend/gi, '!x.isprevnotrend')

	buf = buf.replace(/LastTinYear\(FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)\)/gi, 'x.firsttrend.lastbkyr')
	buf = buf.replace(/FirstTInFormulaset\(NoTrend\)/gi, 'x.firstnotrend')
	buf = buf.replace(/FirstTInFormulaset\(Trend\)/gi, 'x.firsttrend')
	buf = buf.replace(/FirstTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.firstnotrend')
	buf = buf.replace(/FirstTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.firsttrend')

	buf = buf.replace(/LastTinFormulaSet\(NoTrend\)/gi, 'x.lastnotrend')
	buf = buf.replace(/LastTinFormulaSet\(Trend\)/gi, 'x.lasttrend')
	buf = buf.replace(/LastTinFormulaSet\(NoTrend,\s*(\w+|\d+)\)/gi, 'x.lastnotrend')
	buf = buf.replace(/LastTinFormulaSet\(Trend,\s*(\w+|\d+)\)/gi, 'x.lasttrend')
	// buf = buf.replace(/LastTinFormulaSet\(NoTrend,PeriodInT\)/gi, 'x.lastnotrend');

	buf = buf.replace(/FormulaSetInT\(LastTinPeriod\)/gi, 'x.lastinperiod')
	buf = buf.replace(/FormulaSetInT\(FirstTinPeriod\)/gi, 'x.firstinperiod')

	buf = buf.replace(/\[LastTinPeriod\(PeriodInT\)]/gi, '[lastinperiod]')
	buf = buf.replace(/\LastTinPeriod\(PeriodInT\)/gi, 'x.lastinperiod')
	buf = buf.replace(/LastTinYear\(T-TsY\)/gi, 'x.prevbkyear')

	buf = buf.replace(/\[1]/g, '[doc]')
	buf = buf.replace(/\[T]/g, '') //Variable[T] is the same as Variable, its always in default to the corresponding time.
	buf = buf.replace(/\[GetT\(T,-1\)]/gi, '[prev]') //Variable[T] is the same as Variable, its always in default to the corresponding time.
	buf = buf.replace(/\[LastT\]/gi, '[lastinperiod]')
	//(FormulaSetInT(GetT(T,-1))<>NoTrend) ==>  !x.prev.isnotrend
	buf = buf.replace(/ValueT\(1\)/gi, 'x.firstdetail')
	buf = buf.replace(/GetT\(T,-TsY,0,TsY\)/gi, 'x.prevbkyr')
	buf = buf.replace(/GetT\(T,-1\)/gi, 'x.prev')
	buf = buf.replace(/GetT(T,-1,1,1)/gi, 'x.prev')
	buf = buf.replace(/\(MaxT\)/g, '(x.last)')//only replace Function(MaxT) into  Function(x.last)

	//TODO: same as TSY?
	buf = buf.replace(/TsY\(LastTinPeriod\)/gi, 'TsY')
	buf = buf.replace(/TsY\(T\)/gi, 'x.tsy')
	buf = buf.replace(/\[0\]/g, '.title ')
	/*buf = buf.replace(/Visible\((\w+)\)/gi, '$1.visible')  ; Is done in ASTPreparser.js*/

	//(& types
	buf = buf.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 ')// replace all '=   &' and '(  &'   with = or ( respectively
	buf = buf.replace(/\(\s*not /gim, '(!')//this of course only tackles the half of it
	buf = buf.replace(/^\s*&/gm, '')

	//AND &
	buf = buf.replace(/&/gmi, '+')// convert & to &&
	buf = buf.replace(/ And /gmi, '&&')// convert & to &&
	buf = buf.replace(/\)\s*and\s*\(/gmi, ')&&(')// convert )  and ( => &&

	buf = buf.replace(/\s*&&not\s*/gmi, '&& !')// convert )  and ( => &&

	//OR |
	buf = buf.replace(/\||\s+or /gmi, ' || ')// convert | to ||
	buf = buf.replace(/ Or /gmi, ' || ')// convert OR to ||
	buf = buf.replace(/\)\s*or\s*\(/gim, ')||(')

	//fix = to == when <=
	buf = buf.replace(/=/gm, '==')// convert = to ==
	buf = buf.replace(/<==/gm, '<=')
	buf = buf.replace(/>==/gm, '>=')
	buf = buf.replace(/<>/gm, '!=')
	buf = buf.replace(/<->/gm, '!=')
	buf = buf.replace(/ Implies /g, '&&')
	buf = buf.replace(/ mod /g, ' % ')

	return buf
}

//finFormulaGeneric('[(VATPaymentFraction[GetT(T,-1)]>0)*(Round(VATPaymentFraction[GetT(T,-1)],0)=VATPaymentFraction[GetT(T,-1)])]'))
function javaScriptToFinGeneric(buf) {
	buf = buf.replace(/!=/gm, '<>')
	//buf = buf.replace(/<=/gm, '<==');
	//buf = buf.replace(/>=/gm, '>==');
	buf = buf.replace(/==/gm, '=')// convert = to ==
	buf = buf.replace(/\|\|/gmi, ' | ')// convert | to ||
	buf = buf.replace(/&&/gmi, ' & ')// convert )  and ( => &&
	return buf
}

//if it ends up being impossible to resolve generic
//we will have to do it in the formula-bootstrap.js
//there we know what is a Variable name
function finChoice(formula) {
	/**
	 * Sometimes FFL is converted incorrectly with a trailing '\''
	 * This is bugfixing the problem
	 */
	formula = formula.replace(/\\''$/g, '\'')

	//looks like a variable reference
	if (/^[a-z0-9_ ]+$/i.test(formula)) {
		return formula + '.choices'
	}
	//tricky one is just
	//three options
	//Directly with mm/dd/yy
	else if (formula.indexOf('|') < 0 && formula.indexOf(':') < 0) {
		const cleanslice = formula.slice(1, -1)
		return `[{ "name": "${cleanslice}", "value": "${cleanslice}" }]`
	}
	//NL|USA|BEL|GER
	else if (formula.indexOf(':') < 0) {
		var split = formula.split('|')
		//remove a trailing and leading " character.
		split[0] = split[0].slice(1)
		split[split.length - 1] = split[split.length - 1].slice(0, -1)

		split = split.map(function(e, idx) {
			return `{ "name": "${idx}" ,"value":${e ? '"' + e + '"' : null}}`
		})
		return `[${split.join(',')}]`
	}
	//HIGH:1|LOW:2|UNKNOWN:3
	else {
		formula = formula.trim().slice(1, -1)
		var choices = formula.replace(/'/gmi, '')
		choices = choices.replace(/: /g, ':')
		choices = choices.replace(/:/gmi, '\" , \"value\" : \"')
		choices = choices.replace(/\|/gmi, '\"} , { \"name\" :\"')
		return `[{ "name" : "${choices}" }]`
	}
}

function FinFormula() {
}

FinFormula.prototype.toJavascriptChoice = function(choiceObjectString) {
	const choiceObject = JSON.parse(choiceObjectString.replace(/'/gmi, '"'))
	let response = ''
	for (let i = 0; i < choiceObject.length; i++) {
		const choiceItem = choiceObject[i]
		if (i !== 0) {
			response += '|'
		}
		response += `${choiceItem.name}|${choiceItem.value}`
	}
	return response
}

FinFormula.prototype.finFormulaGeneric = finFormulaGeneric
FinFormula.prototype.javaScriptToFinGeneric = javaScriptToFinGeneric
FinFormula.prototype.parseFormula = finFormulaGeneric
FinFormula.prototype.finChoice = finChoice

//something more useful came to mind, catches this large chunk of possibilities.
//>> old version would look like : buf = buf.replace(/Q_Map([0-9]{2})/gi, 'Q_MAP$1')9;
FinFormula.prototype.fixCasing = function(buf) {
	return buf.replace(/[^\w]{1}(Q_\w*)/gmi, function($1) {
		return $1.toUpperCase()
	})
}
export { FinFormula }
export default new FinFormula()