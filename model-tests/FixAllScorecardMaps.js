const modelWalker = require('../git-connect/FFLModelWalker').ModelWalker
new modelWalker(__dirname + '/../git-connect/resources/').walk(function(path) {
    require('fs').readFile(path, 'utf8', function(err, data) {
        data = require('./plugins/ScorecardQ_caseFix').ScorecardQCaseFix.parse(data)
        require('fs').writeFile(path,data,'utf8',function() {
            console.info(data.length)
        })
    })
    //require('fs').writeFileSync('./KSP.ffl', ffl)
})