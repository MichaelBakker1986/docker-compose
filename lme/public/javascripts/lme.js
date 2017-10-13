require('../../../../../../stack/FESJS/ff-fes/exchange_modules/lme/lmeparser');
const lme = require('../../../../../../stack/FESJS/ff-V05/V05');
var xhr = new XMLHttpRequest();
MatrixLookup = function() {
    return 1;
}
xhr.addEventListener('load', function(e) {
    let returnData = JSON.parse(this.responseText);
    lme.importSolution(returnData , "lme");
    lme.fixProblemsInImportedSolution();
});
xhr.open('GET', '/public/json/V05_canvas.json');
xhr.send();
LME = lme;