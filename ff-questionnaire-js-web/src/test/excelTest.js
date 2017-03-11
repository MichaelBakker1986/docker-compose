var beautify = require('../../node_modules/excel-formula/dist/excel-formula')
/**
 *
 * @memberof excelFormulaUtilities.parser
 * @function
 * @param {string} formula
 * @param {object} options optional param
 *<pre>
 *   TEMPLATE VALUES
 *  {{autoindent}} - apply auto indent based on current tree level
 *  {{token}} - the named token such as FUNCTION_NAME or "string"
 *  {{autolinebreak}} - apply linbreak automaticly. tests for next element only at this point
 *
 * Options include:
 *  tmplFunctionStart           - template for the start of a function, the {{token}} will contain the name of the function.
 *  tmplFunctionStop            - template for when the end of a function has been reached.
 *  tmplOperandError            - template for errors.
 *  tmplOperandRange            - template for ranges and variable names.
 *  tmplOperandLogical          - template for logical operators such as + - = ...
 *  tmplOperandNumber           - template for numbers.
 *  tmplOperandText             - template for text/strings.
 *  tmplArgument                - template for argument seperators such as ,.
 *  tmplFunctionStartArray      - template for the start of an array.
 *  tmplFunctionStartArrayRow   - template for the start of an array row.
 *  tmplFunctionStopArrayRow    - template for the end of an array row.
 *  tmplFunctionStopArray       - template for the end of an array.
 *  tmplSubexpressionStart      - template for the sub expresson start
 *  tmplSubexpressionStop       - template for the sub expresson stop
 *  tmplIndentTab               - template for the tab char.
 *  tmplIndentSpace             - template for space char.
 *  autoLineBreak               - when rendering line breaks automaticly which types should it break on. "TOK_SUBTYPE_STOP | TOK_SUBTYPE_START | TOK_TYPE_ARGUMENT"
 *  newLine                     - used for the {{autolinebreak}} replacement as well as some string parsing. if this is not set correctly you may get undesired results. usually \n
 *     for text or <br /> for html trim: true                  - trim the output. customTokenRender: null     - this is a call back to a custom token function. your call back
 *     should look like EXAMPLE:
 *
 *                                    customTokenRender: function(tokenString, token, indent, linbreak){
     *                                        var outstr = token,
     *                                            useTemplate = true;
     *                                        // In the return object "useTemplate" tells formatFormula()
     *                                        // weather or not to apply the template to what your return from the "tokenString".
     *                                        return {tokenString: outstr, useTemplate: useTemplate};
     *                                    }
 *
 *</pre>
 * @returns {string}
 */
var excelFormulaUtilities = global.excelFormulaUtilities;
var formattedFormula = excelFormulaUtilities.formatFormula('true | IF(1+1=2,"true","false")', {
    tmplFunctionStart: '{{autoindent}}{{token}}(\n',
    tmplFunctionStop: '\n{{autoindent}}{{token}})',
    tmplOperandError: ' {{token}}',
    tmplOperandRange: '{{autoindent}}{{token}}',
    tmplLogical: '{{token}}{{autolinebreak}}',
    tmplOperandLogical: '{{autoindent}}{{token}}',
    tmplOperandNumber: '{{autoindent}}{{token}}',
    tmplOperandText: '{{autoindent}}"{{token}}"',
    tmplArgument: '{{token}}\n',
    tmplOperandOperatorInfix: ' {{token}}{{autolinebreak}}',
    tmplFunctionStartArray: '',
    tmplFunctionStartArrayRow: '{',
    tmplFunctionStopArrayRow: '}',
    tmplFunctionStopArray: '',
    tmplSubexpressionStart: '{{autoindent}}(\n',
    tmplSubexpressionStop: '\n)',
    tmplIndentTab: '\t',
    tmplIndentSpace: ' ',
    autoLineBreak: 'TOK_TYPE_FUNCTION | TOK_TYPE_ARGUMENT | TOK_SUBTYPE_LOGICAL | TOK_TYPE_OP_IN ',
    newLine: '\n',
    trim: true,
    customTokenRender: null,
    prefix: "",
    postfix: ""
});
console.log(formattedFormula);
//multiCharOperators ",>=,<=,<>,&&,||,"
// infixoperators "+-*/^&=><|&"
console.log(excelFormulaUtilities.formatFormula('=AND(TRUE, IF(1+1=2,"true","false")'))
console.log(excelFormulaUtilities.formatFormula('=I5+I10'))
console.log(excelFormulaUtilities.formula2JavaScript('AND(TRUE, IF(1+1=2,"true","false")'))