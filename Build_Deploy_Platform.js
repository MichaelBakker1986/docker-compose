/**
 * Run all tests in project
 **/

import { error, info } from 'log6'
import { spawn }       from 'child_process'

const remove_line_break = (message) => message.toString().substring(0, message.toString().length - 1)

const run_prom = async (name, command) => {
	info(`Start ${command}`)
	const [cmd, rest] = [command.split(' ')[0], command.split(' ').splice(1)]
	const childProcess = spawn(cmd, rest, { capture: ['stdout', 'stderr'] })
	const logger = (data) => {
		console.log(`[${name.padStart(10)}] ${remove_line_break(data)}`)
	}
	childProcess.stdout.on('data', logger)
	childProcess.stderr.on('data', logger)
}

async function startPlatform_build() {
	const version = 'michaelbakker1986/lme_platform:0.1.2'
	try {
		await run_prom('stop docker', 'docker stop lme_platform')
	} catch (err) {
		//NO-OP
	}
	await run_prom('docker build', `docker build . -t=${version}`)
//	info(platform_build_result)
	await run_prom('start', `docker run -t -i -d -p 8080:7081 --name lme_platform -e ENABLED_MODELS=KSP2 ${version}`)
//	info(platform_run_result)
}

startPlatform_build()