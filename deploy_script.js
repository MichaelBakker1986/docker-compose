/**
 * Run all tests in project
 **/

import { error, info } from 'log6'
import { exec }        from 'child-process-promise'

const run_prom = (command) => {
	return exec(command).then(() => {
		info(`Done ${command}`)
	}).catch((err) => {error(err)})
}
run_prom('docker stop lme_platform').then(() => {
	info('docker stop lme_platform done')
})

/*
 exec('docker stop lme_platform').then(({ stdout }) => {
 info('docker stop lme_platform done\n' + stdout)
 exec('docker build . -t=michaelbakker1986/lme_platform:0.0.1').then(() => {
 info('docker build done')
 exec('docker run -p 8080:7081 --name lme_platform -e ENABLED_MODELS=KSP2 michaelbakker1986/lme_platform:0.0.1').then(() => {
 info('docker start done')
 })
 })
 })*/
