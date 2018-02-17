const log = require('log6')
const duplicates = {}
const jslrs = require("js-longest-repeated-substring");

String.prototype.findParenthesis = function() {
    var a = [], r = [];
    var txt = this;
    for (var i = 0; i < txt.length; i++) {
        if (txt.charAt(i) == '(') {
            a.push(i);
        }
        if (txt.charAt(i) == ')') {
            r.push(txt.substring(a.pop() + 1, i));
        }
    }
    return r;
}
/**
 * Extract formula parenthesis closures with function declaration
 * while extracting count occurrences
 * Take the mose significant ones
 * Extract them being functions
 * Occurrence being static are variables.
 */
var fs = require('fs')
// /var jsMath = require('jqmath')
var f = fs.readFileSync(__dirname + '/Facility_tpLiquiditySpreadRepaymentAnnuity.ffl', 'utf8');
var fp = fs.readFileSync(__dirname + '/PRICING.ffl', 'utf8');

var excelFormula = require('excel-formula')
/**
 * spaces are not interesting at all
 **/
f = f.replace(/\s+/gmi, '')
/**
 * (& and ,& are strange things which are no useful addition
 */
f = f.replace(/\(&/gmi, '(')
f = f.replace(/,&/gmi, ',')
/**
 * Example simple optimization, 8rows win. for one extra function
 */
f = f.replace(/MatrixLookup\("AAB_Parameters\.xls"\,/gmi, 'MatrixLookup(')
/**
 * Example simple variable extraction
 */
f = f.replace(/X\*12/gmi, 'cTsY')
log.info(">>>>>. " + jslrs.lrs(f)); // display ATCGA
log.info(f)
log.info(excelFormula.formatFormula(f))