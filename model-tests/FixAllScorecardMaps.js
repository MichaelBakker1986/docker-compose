const FileWalker = require('../git-connect/FileWalker')
const log = require('log6')
new FileWalker().walk(function(path) {
    require('fs').readFile(path, 'utf8', function(err, data) {
        data = require('../lme-model-api/src/ScorecardQ_caseFix').ScorecardQCaseFix.parse(data)
        require('fs').writeFile(path, data, 'utf8', function() {
            log.info(data.length)
        })
    })
})