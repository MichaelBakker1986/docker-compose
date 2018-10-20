import { exec }                            from 'child-process-promise'
import { DEBUG, debug, error, info, warn } from 'log6'
import write                               from 'node-fs-writefile-promise'
import { ModelStorage as modelStorage }    from './ModelStorage'
import uuid                                from 'uuid4'
import path                                from 'path'

const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const domain = process.env.DOMAIN || (`${host}:${internal_proxy_port}/id/guest`)

const develop = (!process.env.DOMAIN)

//make git ls-files-root alias
exec('git config --global alias.ls-files-root "! git ls-files"')
.then(() => debug('Added "git ls-files"'))
.catch(() => error('Cannot symlink "git ls-files"'))

class Stash {
	constructor() {
	}

	preview(user_id, name, data) {
		const tempHash = `_tmp_${uuid()}_${name}`
		return write(path.join(__dirname, `/../../git-connect/resources/${tempHash}.ffl`), data)
		.then(() => {
			return exec(`node -r babel-register ${__dirname}/FFLWebpackConverter.js ${tempHash}`).then((result) => {
				if (result.stderr) throw Error(result.stderr)
				let userID = uuid()
				console.info(`<span>Temporary model update:</span><a href="http://${domain}/scorecard.html#${tempHash}&${userID}">${name}</a><span></span>`)
				return tempHash
			}).catch((err) => {
				throw Error(`Failed to write or compile javascript\n ${err.toString()}`)
			})
		}).catch(function(err) {
			throw Error(`Failed to write file to resources folder ${err.stack}`)
		})
	}

	commitJBehaveFile(user_id, name, data) {
		return write(`${__dirname}/../../git-connect/resources/${name}.story`, data)
		.then(function() {
			let userID = uuid()
			if (develop) {
				console.info(`<span>Story update:</span><a href="http://${domain}ide.html#${name}&${userID}">${name}</a><span></span>`)
				return 'Done'
			}
			let command = `git pull &&  git commit -a -m "Story update [${name}] by ${user_id}@${host}" && git push && git rev-parse HEAD`
			return exec(command).then((ok) => {
				const output = ok.stdout.split('\n')
				const stashCommit = `<a href="https://stash.topicus.nl/projects/FF/repos/fesjs/commits/${output[output.length - 2]}"> DIFF </a>`
				console.info(`<a href="http://${domain}ide.html#${name}&${userID}"> ${name} </a><span> Updated </span>${stashCommit}<span> By ${user_id}@${host}</span>`)
			}).catch((err) => {
				const errorData = err.toString()
				if (errorData.indexOf('No changes detected') > -1) {
					return 'No changes detected in file.'
				} else {
					throw Error(`GIT commit failed while pushing file to repository:[${errorData}]`)
				}
			})
		}).catch(function(err) {
			throw Error('Failed to write file to resources folder. [' + err.toString() + ']')
		})
	}

	//TODO: backup file, on fail restore old file
	commit(user_id, name, data, type) {
		/*
		 * Save delta's to the DB to keep track of history.
		 * Later this will be used to resolve the FFL
		 * The FFL file will always be pushed to master also
		 */
		try {
			modelStorage.saveDelta(name, data)
		} catch (err) {
			warn('Failed saving delta to DB', err)
		}
		//transform ffl to JSON canvas file
		return Promise.all([write(`${__dirname}/../../git-connect/resources/${name}` + (type || '.ffl'), data)])
		.then(() => {
			return Promise.all([exec(`node -r babel-register ${__dirname}/FFLWebpackConverter.js ${name} ${type === '.ffl' ? 'FFL2' : 'FFL'}`)]).then((result) => {
				if (result[0].stderr) throw Error(result[0].stderr)
				let userID = uuid()
				if (develop) {
					console.info(`<span>ffl model update:</span><a href="http://${domain}/#${name}&${userID}">${name}</a><span></span>`)
					info(`[${user_id}] modified model file: [${name}]. Begin pushing to repository.`) //=> '/tmp/foo'
					return 'develop mode'
				}
				let command = `git pull &&  git commit -a -m "Model update [${name}] by ${user_id}@${host}" && git push && git rev-parse HEAD`
				return exec(command).then((ok) => {
					const output = ok.stdout.split('\n')
					const stashCommit = '<a href="https://stash.topicus.nl/projects/FF/repos/fesjs/commits/' + output[output.length - 2] + '"> DIFF </a>'

					console.info('<a href="http://' + domain + '#' + name + '&' + userID + '"> ' + name + ' </a><span> Updated </span>' + stashCommit + '<span> By ' + user_id + '@' + host + '</span>')
				}).catch((err) => {
					const errorData = err.toString()
					if (errorData.includes('No changes detected')) {
						return 'No changes detected in file.'
					} else {
						throw Error(`GIT commit failed while pushing file to repository:[${errorData}]`)
					}
				})
			}).catch((err) => {
				throw Error(`Failed to write or compile javascript. [${err.toString()}]`)
			})
		}).catch((err) => {
			throw Error(`Failed to write file to resources folder. [${err.toString()}]`)
		})
	}

	models(branch, path) {
		let command = `git ls-files-root *.${path}`
		return exec(command)
		.then(function(result) {
			return result.stdout.replace(/.*[\/\\](.*)\.ffl/gmi, '$1').split('\n')
		}).catch(function(err) {
			if (err.code === 1) {
				if (DEBUG) debug('while requesting ffl-models, cannot connect to remote git, falling back to local')
				return exec('git ls-files-root *.' + path).then((result) => {
					return result.stdout.replace(/.*[\/\\](.*)\.ffl/gmi, '$1').split('\n')
				}).catch((err) => {
					throw Error(`Cannot list files at all ${err.stack}`)
				})
			} else {
				throw Error(`Failed to read local models. ${err.stack}`)
			}
		})
	}

	branches() {
		let command = develop ? 'git branch' : 'git ls-remote --heads'
		return exec(command)
		.then(function(result) {
			//split results with tabs and newlines, extract only the branch names
			return result.stdout.split(/[\t\n]/).filter((element, index) => {
				return (index % 2 !== 0)
			})
		}).catch(function(err) {
			if (err.code === 128) {
				debug('while requesting remote branches, cannot connect to remote git, falling back to local')
				return exec('git branch').then((result) => {
					return result.stdout.split(/[\t\n]/).filter((element, index) => {
						return (index % 2 === 0)
					})
				}).catch((err) => {
					throw Error(`Cannot resolve branches at all ${err.stack}`)
				})
			} else {
				throw Error(`Failed to resolve branches.\n${err.toString()}`)
			}
		})
	}
}

exports.Stash = new Stash()