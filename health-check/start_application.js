import { info }  from 'log6'
import { spawn } from 'child_process'

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
Promise.all([run_prom('api', 'node ./dist/bin/www'), run_prom('speed_job', 'node ./dist/trader-connector/ThuisSpeedTest')])
.then(() => {}).catch(() => {})
