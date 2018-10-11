/**
 * The server will not update from remote in developer mode.
 * @type {number}
 */
//const developer = (host === 'localhost' || host === '127.0.0.1');
import express         from 'express'
import now             from 'performance-now'
import request         from 'request-promise-json'
import { exec, spawn } from 'child-process-promise'
import path            from 'path'
import HipchatConnect  from './hipchat/Hipchat-connect'

import { existsSync } from 'fs'

const port = 8081
const host = process.env.HOST || '127.0.0.1'
const internal_proxy_port = process.env.INTERNAL_PROXY_PORT || 7081
const developer = process.env.DOMAIN == null
const domain = process.env.DOMAIN || (`http://${host}:${internal_proxy_port}/id/guest`)
const app = express()
let busyRedeploying = false
const childProcesses = {}
const log = (message, level) => HipchatConnect.log(message, level)

//const debug = process.env.NODE_ENV !== 'production'

function spawnChildProcess(app_name) {
	const exists = existsSync(app_name + '.js')
//	if (!exists) throw Error(`File does not exist ${app_name}.js`)
	const promise = spawn('node', ['-r', 'babel-register', `${app_name}`], {
		maxBuffer: 1024 * 500,
		capture  : ['stdout', 'stderr']
	})
	const childProcess = promise.childProcess
	childProcesses[app_name] = childProcess
	childProcess.stdout.on('data', data => {
		log(data.toString(), 'green')
	})
	childProcess.stderr.on('data', data => {
		log(data.toString(), 'red')
	})
	childProcess.on('close', code => {
		console.log(`child process exited with code ${code} ${app_name}`)
	})
	promise.then(function() {
		console.log(`[spawn] done! ${app_name}`)
	})
	.catch(function(err) {
		console.error('[spawn] ERROR: ', err)
	})
}

function redeploy() {
	log('Tests passed deploying stack ')
	Object.keys(childProcesses).forEach(key => {
		childProcesses[key].kill('SIGKILL')
		spawnChildProcess(key)
	})
	busyRedeploying = false
}

function pullBranchAndRedeploy() {
	return new Promise((fulfill, reject) => {
		if (busyRedeploying) {
			reject('Busy restarting.')
		} else {
			let start = now()
			busyRedeploying = true
			//npm install && bower install
			const command = developer ? 'echo developer test message' : 'git clean -f -x && git stash save --keep-index && git pull && cd .. && npm install && npm test'
			exec(command).then(() => {
				redeploy()
				fulfill(`Successful redeploy stack in [${(now() - start).toFixed(3)}]ms`)
			}).catch(() => {
				log('Tests failed, reinstalling modules and try again.', 'green')
				exec('cd .. && npm install && npm test').then(() => {
					redeploy()
					fulfill(`Successful redeploy stack in [${(now() - start).toFixed(3)}]ms`)
				}).catch((err) => {
					busyRedeploying = false
					log(err.toString(), 'red')
					reject(`Fail restarting because\n: ${err.stack.toString()}`)
				})
			})
		}
	})
}

app.get('*/update/git/notifyCommit',async (req, res) => {
	pullBranchAndRedeploy().then(result => {
		res.end(result.toString())
	}).catch(err => res.end(err.toString()))
})

app.get('*/hasUpdates', async (req, res) => {
	checkForUpdates().then((result) => {
		res.end(result.toString())
	}).catch(err => res.end(err.toString()))
})

function checkForUpdates() {
	return new Promise((fulfill, reject) => {
		if (developer) return fulfill({ hasChanges: false })
		const command = 'git remote update && git status -uno'
		//'git diff --stat origin/master';
		exec(command).then((result) => {
			const hasChanges = result.stdout.includes('Your branch is behind')
			if (hasChanges) {
				exec('git diff --stat origin/master').then(result => {
					fulfill(JSON.stringify({
						hasChanges,
						changes: result.stdout.toString()
					}))
				})
			} else {
				fulfill(JSON.stringify({
					hasChanges,
					changes: result.stdout.toString()
				}))
			}
		}).catch(err => {
			log(err.toString(), 'red')
			reject(`Fail restarting ${err.toString()}`)
		})
	})
}

function testAndDeploy() {
	if (!developer) log(`Running integration tests on server ${host}`, 'info')
	const start = now()
	const command = developer ? 'echo test message' : 'cd .. && npm install && npm test'
	exec(command).then(() => {
		spawnChildProcess(path.resolve(`${__dirname}/../proxy`))
		spawnChildProcess(path.resolve(`${__dirname}/../proxy/SecurityPortal`))
		spawnChildProcess(path.resolve(`${__dirname}/../lme-model-api`))
		spawnChildProcess(path.resolve(`${__dirname}/../demo-apps`))
		spawnChildProcess(path.resolve(`${__dirname}/../lme-data-api`))
		registerToProxy()
		log(`Successful deploy application ${domain} in ${((now() - start) / 1000).toFixed(3)}s`)
	}).catch(error => {
		log('Tests failed after reinstalling modules. NOT deploying stack..', 'red')
		log(error.toString(), 'red')
	})
}

function registerToProxy() {
	//just delay the action...
	setTimeout(function() {
		const routes = ['*/hasUpdates']
		app._router.stack.forEach(route_information => {
			if (route_information.route && route_information.route.path) {
				routes.push(route_information.route.path)
			}
		})
		request.get(`http://${host}:${internal_proxy_port}/register/service/update-api/${host}/${port}/${routes.join(',')}`).then(data => {
			if (log.DEBUG) log.debug(data)
		}).catch(err => log.error('Failed to register ', err))
	}, 60000)
}

app.listen(port, () => {
	if (developer) registerToProxy()
	log(`<span>Auto update </span><a href="http://${domain}/update/git/notifyCommit">server</a><span> deployed</span>`)
})

testAndDeploy()