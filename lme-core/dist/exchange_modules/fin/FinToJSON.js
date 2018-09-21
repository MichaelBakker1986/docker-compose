'use strict';

/**
 * We might actually need the fin->ffl/lme parser since the main fin language is .fin
 */
var assert = require('assert');
var log = require('log6');
var finFormula = require('../ffl/FinFormula');
//Attempt3
//the king of regulars, its very simple actually, just get scope all needed information
//first 2 char are P or I
//next 2 P,I or X or ' '
//followed with 11 chars //undefined yet
//followed with the depth flag
//11 more chars //undefined
//non-greedy not [a-z] followed with [a-z]* all of them, to get the variable name
//can't be done easier, sometimes no title, some times a hint
//last chars is for the repeating group, it will repeat when find [PI]2 followed with [PIX ]2
//$1 : varable name
//$2 : metadata
//  regex: /;?([PIX]{2}[PIX ]{2}.{11}(.{1}).{11}.*?(?!:[a-z0-9_])([a-z0-9_]* );.*!?(?:[PIX]{2}[PIX ]{2})*)/gmi,
//and its done

/*{"name":"OtherNegativeMutationsNetWorth","formula":"MutCalc*Max(-BalanceCurrentAccount+BeginningBalanceCurrentAccount+VSUM(@LiquidReceipts,OtherLiquidReceipts$P)+VSum(@OtherLiquidReceipts,OtherPositiveMutationsNetWorth$P)-VSUM(@LiquidExpenses,OtherLiquidExpenses$P)                            -VSum(@OtherLiquidExpenses,OtherNegativeMutationsNetWorth$P),NA)","_contextmeta":"","property":"value"}
 editor.js:16539 2016-08-07T02:11:52+0200 <log> editor.js:22460 (createFormulaSafe) cannot parse: {"name":"OtherPositiveMutationsNetWorth","formula":"MutCalc*Max( BalanceCurrentAccount-BeginningBalanceCurrentAccount-VSUM(@LiquidReceipts,OtherLiquidReceipts$P)                       -VSum(@OtherLiquidReceipts,OtherPositiveMutationsNetWorth$P)+VSUM(@LiquidExpenses,OtherLiquidExpenses$P)+VSum(@OtherLiquidExpenses,OtherNegativeMutationsNetWorth$P),NA)","_contextmeta":"","property":"value"}
 editor.js:16539 2016-08-07T02:11:52+0200 <log> editor.js:22460 (createFormulaSafe) cannot parse: {"name":"DefaultInterestRate","formula":"10%","_contextmeta":"","property":"value"}
 editor.js:16539 2016-08-07T02:11:52+0200 <log> editor.js:22460 (createFormulaSafe) cannot parse: {"name":"DefaultPriceIndex","formula":"OnERorNA(OnZero(Case(DateToYear(LastDateInT),[#$CPI_list#]),NA)/Case(DateToYear(LastDateInT(FirstTinFormulaSet(Notrend,MainPeriod))),[#$CPI_list#])*100,If(T==FirstTinFormulaSet(Notrend,MainPeriod),100,If(FirstTinYear==T, Self[T-1]*(1+DefaultPriceIncreaseTrend), Self[T-1])))","_contextmeta":"","property":"value"}
 editor.js:16539 2016-08-07T02:11:52+0200 <log> editor.js:22460 (createFormulaSafe) cannot parse: {"name":"DefaultWagesIndex","formula":"OnERorNA(OnZero(Case(DateToYear(LastDateInT),[#$CAO_list#]),NA)/Case(DateToYear(LastDateInT(FirstTinFormulaSet(Notrend,MainPeriod))),[#$CAO_list#])*100,If(T==FirstTinFormulaSet(Notrend,MainPeriod),100,If(FirstTinYear==T, Self[T-1]*(1+DefaultWagesIncreaseTrend), Self[T-1])))","_contextmeta":"","property":"value"}*/

//here we only extract data into another flow, not parsing formulas
//function ($0, $1) { return $1 ? $0 : '[match]'; })
//only for formula types,
//share this with bracketparser
var timeRefs = {
    '[T-1]': '', //previous column reference
    'LastTinFormulaSet(Notrend,MainPeriod)': '', //NoTrend >lastColumn,hoofdtijdlijn
    '[GetT(T,-TsY,0,TsY)]': '', //-1year first column?
    'FirstTinFormulaset(Trend)': '', //Trend > first column
    '[GetT(T, -1, 1, 1)]': '', //
    'FormulasetInT(GetT(T,-1)': '',
    '[LastTinYear,FesExpression(DocumentTsY)]': '',
    'FirstTinFormulaset(Trend,PeriodinT)': '',
    'LastTinYear(T-TsY)': '',
    '[MaxValueT(CapitalShortfall,FirstTinYear,LastTinYear)]': '',
    'FirstTinformulaset(Trend,PeriodInT)': '',
    'LastTinFormulaSet(NoTrend)': '',
    '[LastTinFormulaSet(NoTrend)]': '',
    'FormulaSetInT(T-1)': '',
    'TsY': '', //DocumentTsY
    'TsY(?)': '',
    'FirstTInFormulaset(Trend)': '',
    '[LastTinPeriod]': '',
    '[LastTinFormulaSet(NoTrend),1]': '',
    'FirstTinformulaset(Trend)': '',
    'firstTinFormulaSet(NoTrend)': ''
};
types = {
    fesevent: function fesevent(solution, obj) {},
    templates: function templates(solution, obj) {},
    language: function language(solution, obj) {
        //nothing for now
    },
    tryinclude: function tryinclude(solution, obj) {
        //nothing for now
    },
    quit: function quit(solution, obj) {
        //nothing for now
    },
    unknown: function unknown(solution, obj) {
        //no solid way to extract the modelname
        //using first unknown type after .Language context
        if (solution.solutionName == undefined) {
            //don't allow spaces in solution name
            var solutionName = obj.data.replace(/ /gm, "").toUpperCase();
            if (solutionName !== '') {
                solution.solutionName = solutionName;
            }
        } else {
            log.info('Warn:  ' + JSON.stringify(obj));
        }
    },
    //there is soo many pattern, we can do this easier later.
    //throwing all away, just keeping a mapping of some kind
    formulas: function formulas(solution, obj) {
        obj.property = 'value';
        obj.formula = finFormula.finFormulaGeneric(obj.formula);
    },
    hints: function hints(solution, obj) {
        obj.property = 'hint';
        //   obj.property = 'hint';
        obj.formula = finFormula.finFormulaGeneric(obj.formula);
        //Hints are always interpreted as String, they don't add qoutes in the fin language
        //ensure its a quoted
        obj.formula = "'" + obj.formula.replace(/["'](.*)["']/gm, "$1") + "'";
    },
    choices: function choices(solution, obj) {
        obj.property = 'choices';
        // obj.property = 'choices';
        obj.formula = finFormula.finChoice(obj.formula);
    },
    visible: function visible(solution, obj) {
        obj.property = 'visible';
        obj.formula = finFormula.finFormulaGeneric(obj.formula);
    },
    inputrequired: function inputrequired(solution, obj) {
        obj.property = 'required';
        obj.formula = finFormula.finFormulaGeneric(obj.formula);
    },
    locked: function locked(solution, obj) {
        obj.property = 'locked';
        obj.formula = finFormula.finFormulaGeneric(obj.formula);
    },
    variables: function variables(solution, obj) {
        //obj.property = 'formula';
        //a variable can have some formula
        //hint,visible,locked,title
        if (obj.title === undefined) {
            log.info('>>' + obj);
        }
        obj.title = "'" + obj.title.replace(/["'](.*)["']/gm, "$1") + "'";
    }

    //the additional regexes will be enormous.
};function parseFinFile(buf) {
    if (buf.length !== 0) {
        //cant change too much here,
        //but removing large chunks, like comments, empty lines will speed up the rest.
        buf = buf.replace(/;.*$/gm, ''); //remove commented lines and commented appendings

        buf = finFormula.fixCasing(buf);

        //even when removing white lines, its takes more time to finsih buf = buf.replace(/\s*$/gm, '');//remove commented lines, and white lines before it
        //very exensive.. //buf = buf.replace(/[\r\n\s]+\s*[\r\n]*$/gm, '');//remove empty stuff
        //---TODO: Remove thing between here and row replacement, better to debug
        buf = buf.replace(/#(\w+)#/gim, "GetValue('$1')"); //these will be regular .value later

        //don't seem to loss anything if i just try these away
        buf = buf.replace(/\<\$/gim, '');
        buf = buf.replace(/\$\>/gim, '');

        //---------------- MOVE TO Formula
        //change (& to (
        //change ,&
        //i should do all these actions in mirror also
        //also this one, only for formulas
        //better try and move him
        buf = buf.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 '); // replace all '=   &' and '(  &'   with = or ( respectively
        buf = buf.replace(/&\s{0,2}"/gm, '+"'); // & " => +"
        buf = buf.replace(/"\s{0,2}&/gm, '"+'); // " & => "+
        //---------------- END MOVE TO Formula

        //shortcut THIS WILL fail when parsing formulas containing strings..
        //remove  the '\', any ' and tabs
        buf = buf.replace(/['\\\t]/gm, ' ');
        //change the " to '
        buf = buf.replace(/["]/gm, '\'');
        //---TODO: Remove thing between here and row replacement, better to debug
        //variables first
        //still having appending title spaces.
        //PPP     1A   1 3               $>Warning voor X_MAP01_Vraag04<$                                    \X_MAP01_Vraag04
        //                       1                           2      3      4               4          5         6   7           8
        //                            2        3        4   11    12  15     16 24
        buf = buf.replace(/^([PIX]{1})[PIX ]{1}[PIX ]{2}.{7}(.).{3}(.).{4}(.).{3}\s*(.{12}.*?)\s*(\\|\=)?((?!:\w)(\w+))\s*(?:\nC(.*)|\n)/gmi, "{ \"_type\" : \"variables\" , " + "\"name\" : \"$7\" , " + "\"displaytype\" : \"$2\"," + "\"title\" : \"$5\"," + "\"_depth\" : $3," + "\"required\" : \"$4\"," + "\"hint\": \"$9\"," + "\"protection\" : \"$1\"," + "\"modifier\" : \"$6\" } ,\n");

        //Variable, single formulas
        //has prepending formula  spaces.
        buf = buf.replace(/\.Variable\s*(\w+)\s*,\s*(\w+).*?=(.*?)\s*$/gmi, "{ \"_type\": \"formulas\" , \"name\" : \"$1\" , \"formula\" : \"$3\" , \"property\" : \"$2\"  } , ");

        //formulas
        buf = buf.replace(/^(\w+)\s*=\s*(.*)\s*$/gmi, "{ \"_type\":\"formulas\" , \"name\" : \"$1\" , \"formula\": \"$2\" }, ");
        //state instructions
        buf = buf.replace(/^\.(\w+)\S*(\w*)?\S*(.*)$/gmi, "{ \"_type\" :\"state\" , \"name\" : \"$1\", \"meta\" : \"$2\"  } , ");

        //state instructions {{&&TryInclude and Language
        buf = buf.replace(/^\{&&(\w*)\s*=?"?'?([\w\-.]*)'?"?}\S*?/gmi, "{ \"_type\" :\"unknown\" , \"name\" : \"$1\", \"meta\" : \"'$2'\"  } , \n");

        //remove any lines that could not be parsed
        //includes Model-Title
        buf = buf.replace(/^((?!(?:[\{\s]))(.*))$/gmi, "{ \"_type\" : \"unknown\" , \"data\" : \"$2\" } , ");

        //remove last comma
        buf = buf.replace(/,(?=[^,]*$)/, "");

        var rows = JSON.parse("[" + buf + "]");
        buf = undefined; //this will speed up debug enormously
        //there are four types:
        //.Variable, just a variable formula, expect one formula, and one formula type;
        //.Formula a formula in a context
        //.Variables, a variable declarion
        //state: ModelName, Quit, level indent and rest.

        //we don't have to worry about spaces anymore
        //since .Variable, and .Formula are the same, but only interpret different we going to merge them

        //so we wanna go back to only two types, Formula an Variable declaration
        var solution = {};
        var orderedByType = {
            formulas: [],
            variables: []
        };

        var state = {
            _type: 'init',
            name: 'name',
            meta: undefined
        };
        var nestedState = {};
        for (var i = 0; i < rows.length; i++) {
            //clean up this too large if-then-else
            //ok so the format was designed to be interpreted line by line.
            //we going to add this information to every line when state changes.
            var obj = rows[i];

            if (obj._type === 'state') {
                if (obj.name === 'FesEvent') {
                    nestedState = obj;
                } else {
                    state = obj;
                }
            } else if (obj._type === 'unknown') {
                var objName = obj.name === undefined ? undefined : obj.name.toLowerCase();
                if (types[objName]) {
                    types[objName](solution, obj);
                } else {
                    types['unknown'](solution, obj);
                }
            } else {
                //Trend,NotTrend, any addition to .Formula
                obj._contextmeta = state.meta;
                //ensure the array exists
                //there are two groups, formulas and variables
                orderedByType[obj._type].push(obj);
                //find a way to be case-insensitive
                var objName = (obj.property || nestedState.name || state.name).toLowerCase();

                if (types[objName] == undefined) {
                    log.warn('skipping type:[' + obj.property + " OR " + JSON.stringify(state) + "] its not yet registered.");
                    continue;
                }
                types[objName](solution, obj);
                if (state.name === 'FesEvent') {
                    nestedState = {};
                }
                obj._type = undefined;
            }
        }

        if (solution.solutionName !== undefined) {
            solution.rows = rows;
            solution.orderedByType = orderedByType;
            solution.valid = true;
        }
    }
    //.info(types)
    return solution;
}
module.exports = {
    parse: parseFinFile
};