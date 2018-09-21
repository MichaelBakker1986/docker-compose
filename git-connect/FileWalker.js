import fs       from 'fs'
import path     from 'path'
import { sync } from 'glob'

export default class {

	constructor(basePath, patterns, extension) {
		this.paths = new Set()
		this.patterns = patterns || ['*', '*/FFL/*', '*/*/FFL/*', '*/*/*/FFL/*', '*/*/*/*/FFL/*']
		this.basePath = basePath || `${__dirname}/CODELISTS/`
		this.extension = extension || '.ffl'
	}

	multiple(patterns) {
		patterns.forEach(pattern => {
			const files = sync(this.basePath + pattern, {})
			for (let j = 0; j < files.length; j++) {
				this.filesRead(files[j])
			}
		})
	}

	filesRead(file) {
		if (file.toLowerCase().endsWith(this.extension))
			this.paths.add(file)
	}

	walk(visit, do_not_open_file) {
		const promises = []
		this.multiple(this.patterns)

		this.paths.forEach(pathName => {
			if (do_not_open_file) {
				promises.push(visit(path.resolve(pathName), null))
			} else {
				this.readFile(path.resolve(pathName), visit)
			}
		})
		return Promise.all(promises)
	}

	//needs separate method
	readFile(path, visit) {
		fs.readFile(path, { encoding: 'utf8' }, (err, data) => visit(path, data))
	}
}
