import { exec }                                             from 'child-process-promise'
import { DEBUG, debug, error, info, warn }                  from 'log6'
import ModelStorage                                         from './ModelStorage'
import uuid                                                 from 'uuid4'
import { commit, writeJBehaveAsString, writeModelAsString } from '../../git-connect/ResourceManager'

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
		return writeModelAsString({ model_name: tempHash, data })
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
		return writeJBehaveAsString({ name, data })
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
	async commit(user_id, model_name, data, type = '.ffl') {
		/*
		 * Save delta's to the DB to keep track of history.
		 * Later this will be used to resolve the FFL
		 * The FFL file will always be pushed to master also
		 */
		try {
			ModelStorage.saveDelta(model_name, data)
		} catch (err) {
			warn('Failed saving delta to DB', err)
		}
		try {
			await writeModelAsString({ model_name, data })
			try {
				//const executable =
				const result = await exec(`node -r babel-register ${__dirname}/FFLWebpackConverter.js ${model_name} ${type === '.ffl' ? 'FFL2' : 'FFL'}`)
				if (result.stderr) throw Error(result.stderr)
				let userID = uuid()
				if (develop) {
					console.info(`<span>ffl model update:</span><a href="http://${domain}/#${model_name}&${userID}">${model_name}</a><span></span>`)
					info(`[${user_id}] modified model file: [${model_name}]. Begin pushing to repository.`) //=> '/tmp/foo'
					return 'develop mode'
				}
				try {
					const ok = await commit(`Model update [${model_name}] by ${user_id}@${host}`)
					const output = ok.stdout.split('\n')
					const stashCommit = `<a href="https://stash.topicus.nl/projects/FF/repos/financialmodel/commits/${output[output.length - 2]}"> DIFF </a>`
					console.info(`<a href="http://${domain}#${model_name}&${userID}"> ${model_name} </a><span> Updated </span>${stashCommit}<span> By ${user_id}@${host}</span>`)
				}
				catch (err) {
					const errorData = err.toString()
					if (errorData.includes('No changes detected')) {
						return 'No changes detected in file.'
					} else {
						throw Error(`GIT commit failed while pushing file to repository:[${errorData}]`)
					}
				}
			}
			catch (err) {
				throw Error(`Failed to write or compile javascript. [${err.toString()}]`)
			}
		} catch (err) {
			throw Error(`Failed to write file to resources folder. [${err.toString()}]`)
		}
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