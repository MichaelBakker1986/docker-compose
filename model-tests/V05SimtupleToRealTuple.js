/**
 * Convert generated tuples into tuples.
 */
exports.SimTupleFix = function(data) {
    var linecounter = 0;
    var simtuples = []
    var bracketOpen = false;
    var lines = data.split('\n');
    var outputFFL = "";
    let bracketcounter = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        linecounter++;
        if (line.match(/(variable|tuple) (\-|\+|\=){0,1}\w+_ti([0-9]{2}[2-9]{1}|[0-9]{1}1[0-9]{1})/gmi)) {
            bracketOpen = true;
            line = line.replace(/variable/, 'tuple')
            lines[i] = line
            simtuples.push({
                ln: linecounter
            })
        }
        else if (bracketOpen && line.match(/^\s*{\s*$/gmi)) {
            bracketcounter++;
        }
        else if (bracketOpen && line.match(/^\s*}\s*$/gmi)) {
            bracketcounter--;
            if (bracketcounter == 0) {
                bracketOpen = false;
            }
            simtuples[simtuples.length - 1].lnend = linecounter
        }
        else if (!bracketOpen) {
            outputFFL += line + '\n';
        }
    }
    outputFFL = outputFFL.replace(/_ti[0-9]{3}/gmi, '')//just remove Tuple completely
    return outputFFL;
}
//console.info(exports.SimTupleFix(require('fs').readFileSync('../git-connect/resources/FAM.ffl', 'utf8')))