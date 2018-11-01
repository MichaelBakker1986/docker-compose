import { exec }                            from 'child-process-promise'
import { DEBUG, debug, error, info, warn } from 'log6'
import ModelStorage                        from './ModelStorage'
import uuid                                from 'uuid4'
import {
	clean_resources_workspace,
	commit_resources,
	FILE_SYSTEM_RESOURCES_PATH,
	writeJBehaveAsString,
	writeModelAsString
}                                          from '../../git-connect/ResourceManager'
import { Contractor }                      from '../../financiallanguageconverter/DatastoreCluster/index'
import { Register }                        from '../../lme-core/src/Register'
import { FFLToRegister }                   from '../../ffl/FFLToRegister'

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

	async preview(user_id, name, data) {
		const tempHash = `_tmp_${uuid()}_${name}`
		try {
			await writeModelAsString({ model_name: tempHash, data })
			try {
				const result = await exec(`node -r babel-register ${__dirname}/FFLWebpackConverter.js ${tempHash}`)
				if (result.stderr) throw Error(result.stderr)
				let userID = uuid()
				console.info(`<span>Temporary model update:</span><a href="http://${domain}/scorecard.html#${tempHash}&${userID}">${name}</a><span></span>`)
				return { fail: false, hash: tempHash }
			}
			catch (err) {
				return { fail: true, message: `Failed to write or compile javascript\n ${err.toString()}` }
			}
		} catch (err) {
			return { fail: true, message: `Failed to write file to resources folder ${err.stack}` }
		}
	}

	commitJBehaveFile(user_id, name, data) {
		return writeJBehaveAsString({ name, data })
		.then(() => {
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
		}).catch((err) => {
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
		let delta_result = {}
		let method_result = {}
		try {
			delta_result = ModelStorage.saveDelta(model_name, data)

			const contract = new Contractor({ auth_id: model_name, data_id: model_name })
			const modelRegister = new Register
			new FFLToRegister(modelRegister, data).parseProperties()
			await contract.applyContractChanges(modelRegister)

		} catch (err) {
			warn('Failed saving delta to DB', err)
		}
		try {
			await clean_resources_workspace()
			await writeModelAsString({ model_name, data })
			try {
				const result = await exec(`node -r babel-register ${__dirname}/FFLWebpackConverter.js ${model_name} ${type === '.ffl' ? 'FFL2' : 'FFL'}`)
				if (result.stderr) {
					error(result.stderr)
					method_result = { fail: true, message: `Failed to compile javascript because: ${result.stderr}` }
				} else {
					let userID = uuid()
					if (develop && false) {
						console.info(`<span>ffl model update:</span><a href="http://${domain}/#${model_name}&${userID}">${model_name}</a><span></span>`)
						info(`[${user_id}] modified model file: [${model_name}]. Begin pushing to repository.`) //=> '/tmp/foo'
						method_result = { fail: false, message: 'develop mode' }
					} else {
						try {
							const ok = await commit_resources(`Model update [${model_name}] by ${user_id}@${host}`)
							const output = ok.stdout.split('\n')
							const stashCommit = `<a href="https://stash.topicus.nl/projects/FF/repos/financialmodel/commits/${output[output.length - 2]}"> DIFF </a>`
							console.info(`<a href="http://${domain}#${model_name}&${userID}"> ${model_name} </a><span> Updated </span>${stashCommit}<span> By ${user_id}@${host}</span>`)
							method_result = { fail: false, changes: delta_result }
						} catch (err) {
							error(err)
							const errorData = err.toString()
							if (errorData.includes('No changes detected')) {
								return { fail: true, message: 'No changes detected in file.' }
							} else {
								method_result = {
									fail   : true,
									message: `GIT commit failed while pushing file to repository:[${errorData}]`
								}
							}
						}
					}
				}
			}
			catch (err) {
				method_result = { fail: true, message: `Failed to write or compile javascript. [${err.toString()}]` }
			}
		} catch (err) {
			if (DEBUG) debug(`Failed to connect to git-repo ${err.stack}`)
			if (err.toString().includes('Connection timed out')) {
				method_result = { fail: true, message: `Unable to connect to model repository` }
			} else {
				method_result = { fail: true, message: `Failed to write file to resources folder. [${err.toString()}]` }
			}
		}
		return method_result
	}

	async models(branch, path) {
		let command = `cd ${FILE_SYSTEM_RESOURCES_PATH} && git ls-files-root *.${path}`
		try {
			const result = await exec(command)
			return result.stdout.replace(/.*[\/\\](.*)\.ffl/gmi, '$1').split('\n')
		} catch (err) {
			if (err.code === 1) {
				if (DEBUG) debug('while requesting ffl-models, cannot connect to remote git, falling back to local')
				try {
					const result = await exec('git ls-files-root *.' + path)
					return result.stdout.replace(/.*[\/\\](.*)\.ffl/gmi, '$1').split('\n')
				}
				catch (err) {
					throw Error(`Cannot list files at all ${err.stack}`)
				}
			} else {
				throw Error(`Failed to read local models. ${err.stack}`)
			}
		}
	}
}

export default new Stash()