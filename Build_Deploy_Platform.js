/**
 * Run all tests in project
 **/

import { error, info } from 'log6'
import { exec, spawn } from 'child-process-promise'

const run_prom = async (command) => {
	info(`Start ${command}`)
	try {
		const [cmd, rest] = [command.split(' ')[0], command.split(' ').splice(1)]
		const promise = await spawn(cmd, rest)
		const childProcess = promise.childProcess
		let out = ''
		childProcess.stdout.on('data', (data) => {
			out += data.toString()
			console.log('[spawn] stdout: ', data.toString())
		})
		childProcess.stderr.on('data', (data) => {
			out += data.toString()
			console.error('[spawn] stderr: ', data.toString())
		})
		/*const { stdout, stderr } = await exec(command)
		 info(`Done ${command}`)
		 info(stdout)*/
		return out// stderr ? stderr : stdout
	} catch (err) {
		error(err.stack)
		return err.stack
	}
}

async function startPlatform_build() {
	const version = 'michaelbakker1986/lme_platform:0.1.2'
	try {
		await run_prom('docker stop lme_platform')
	} catch (err) {
		//NO-OP
	}
	await run_prom(`docker build . -t=${version}`)
//	info(platform_build_result)
	await run_prom(`docker run -t -i -d -p 8080:7081 --name lme_platform -e ENABLED_MODELS=KSP2 ${version}`)
//	info(platform_run_result)
}

startPlatform_build()