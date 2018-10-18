/**
 * Run all tests in project
 **/

import { error, info } from 'log6'
import { exec }        from 'child-process-promise'

const run_prom = async (command) => {
	info(`Start ${command}`)
	try {
		const { stdout, stderr } = await exec(command)
		info(`Done ${command}`)
		info(stdout)
		return stderr ? stderr : stdout
	} catch (err) {
		error(err.stack)
		return err.stack
	}
}

async function startPlatform_build() {
	const version = 'michaelbakker1986/lme_platform:0.0.1'
	const platform_result = await run_prom('docker stop lme_platform')
	info(platform_result)
	const platform_build_result = await run_prom(`docker build . -t=${version}`)
	info(platform_build_result)
	const platform_run_result = await run_prom(`docker run -t -i -d -p 8080:7081 --name lme_platform -e ENABLED_MODELS=KSP2 ${version}`)
	info(platform_run_result)
}

startPlatform_build()