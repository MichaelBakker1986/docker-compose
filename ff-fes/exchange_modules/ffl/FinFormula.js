//http://excelformulabeautifier.com/
function finFormulaGeneric(buf) {
    //choices fix
    var buf = buf.replace(/:/gm, ', ');
    buf = buf.replace(/(\$p|@|#|%|\.\.)/gmi, '');

    buf = buf.replace(/\[1\]/gm, '[doc]');
    buf = buf.replace(/\[LastT\]/gm, '');
    buf = buf.replace(/ValueT\(1\)/gm, 'x.first.detail');
    // buf = buf.replace(/\[T-1\]/gm, '');
    //-- Context dependencies
    // buf = buf.replace(/\[t-1\]|@|#/gim, ''); //[prev]   : for now, just throw it away, its .prev when using Time
    //   buf = buf.replace(/\[1\]/gm, '');    //[doc]    : requests the DocumentValue
    buf = buf.replace(/\[0\]/gm, '.title ');    //[doc]    : Title Value

    //(& types
    buf = buf.replace(/(=|,|\()\s{0,4}\&/gm, ' $1 ');// replace all '=   &' and '(  &'   with = or ( respectively
    buf = buf.replace(/\(\s*not /gim, '(!');//this of course only tackles the half of it
    buf = buf.replace(/^\s*&/gm, '');

    //AND &
    buf = buf.replace(/&/gmi, '+');// convert & to &&
    buf = buf.replace(/ And /gmi, '&&');// convert & to &&
    buf = buf.replace(/\)\s*and\s*\(/gmi, '&&');// convert )  and ( => &&

    //OR |
    buf = buf.replace(/\||\s+or /gmi, ' || ');// convert | to ||
    buf = buf.replace(/ Or /gmi, ' || ');// convert OR to ||
    buf = buf.replace(/\)\s*or\s*\(/gim, ')||(');

    //fix = to == when <=
    buf = buf.replace(/=/gm, '==');// convert = to ==
    buf = buf.replace(/<==/gm, '<=');
    buf = buf.replace(/>==/gm, '>=');
    buf = buf.replace(/<>/gm, '!=');
    buf = buf.replace(/<->/gm, '!=');
    buf = buf.replace(/ Implies /g, '&&');

    return buf;
}
function javaScriptToFinGeneric(buf) {
    var buf = buf.replace(/!=/gm, '<>');
    //buf = buf.replace(/<=/gm, '<==');
    //buf = buf.replace(/>=/gm, '>==');
    buf = buf.replace(/==/gm, '=');// convert = to ==
    buf = buf.replace(/\|\|/gmi, ' | ');// convert | to ||
    buf = buf.replace(/&&/gmi, ' & ');// convert )  and ( => &&
    return buf;
}
//if it ends up being impossible to resolve generic
//we will have to do it in the formula-bootstrap.js
//there we know what is a Variable name
function finChoice(formula) {
    //looks like a variable reference
    if (/^[a-z0-9_ ]+$/i.test(formula)) {
        return formula + '.choices';
    }
    //tricky one is just
    //three options
    //Directly with mm/dd/yy
    else if (formula.indexOf("|") < 0 && formula.indexOf(":") < 0) {
        return "[{ \"name\" : \"" + formula + "\", \"value\" : \"" + formula + "\" }]";
    }
    //NL|USA|BEL|GER
    else if (formula.indexOf(":") < 0) {
        var split = formula.split('|');
        split[split.length - 1] = split[split.length - 1].slice(0, -1);
        split[0] = split[0].substr(split[0].indexOf('\'') + 1);

        var choices = "{ \"name\" : \"" + split[0] + "\", \"value\" : \"" + split[0] + "\" } ";

        for (var i = 1; i < split.length; i++) {
            var obj = split[i];
            choices += ", { \"name\" : \"" + obj + "\", \"value\" : \"" + obj + "\" }";
        }

        return "[" + choices + "]";
    }
    //HIGH:1|LOW:2|UNKNOWN:3
    else {
        var choices = formula.replace(/'/gmi, '');
        choices = choices.replace(/:/gmi, '\" , \"value\" : \"');
        choices = choices.replace(/\|/gmi, '\"} , { \"name\" :\"');
        return "[{ \"name\" : \"" + choices + "\" }]";
    }
}
function FinFormula() {
}
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
}

FinFormula.prototype.finFormulaGeneric = finFormulaGeneric;
FinFormula.prototype.javaScriptToFinGeneric = javaScriptToFinGeneric;
FinFormula.prototype.parseFormula = finFormulaGeneric;
FinFormula.prototype.finChoice = finChoice;

//something more usefull came to mind, catches this large chunk of possibilities.
//>> old version would look like : buf = buf.replace(/Q_Map([0-9]{2})/gi, 'Q_MAP$1')9;
FinFormula.prototype.fixCasing = function (buf) {
    return buf.replace(/[^\w]{1}(Q_\w*)/gmi, function ($1) {
        return $1.toUpperCase()
    })
};

module.exports = new FinFormula();