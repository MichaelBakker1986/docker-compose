var AST = require('../../fesjs/AST.js');
var mapping = require('./Mapping.js');

function Label(node)
{
    var texts = node[mapping.Text];
    var consequent;
    var alternate;
    var language;
    if (node[mapping.Text].length == 2)
    {
        language = texts[0][mapping._language];
        consequent = texts[0][mapping.__text];
        alternate = texts[1][mapping.__text];
    }
    else
    {
        language = texts[0][mapping._language];
        consequent = texts[0][mapping.__text];
        alternate = texts[0][mapping.__text];
    }

    var body = AST.IF(AST.EQUALS(AST.STRING(language), AST.IDENTIFIER('SETTINGS.LANGUAGE')), AST.STRING(consequent), AST.STRING(alternate));
    return body;
}
module.exports = {
    Label: Label
};