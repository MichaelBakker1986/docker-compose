import { FileWalker }    from '../git-connect/index'
import { info }          from 'log6'
import ScorecardQCaseFix from '../lme-model-api/src/ScorecardQ_caseFix'

import { readFile, writeFile } from 'fs'

new FileWalker().walk((path) => {
	readFile(path, 'utf8', (err, data) => {
		data = ScorecardQCaseFix.parse(data)
		writeFile(path, data, 'utf8', () => info(data.length))
	})
})