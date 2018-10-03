/**
 * Run all tests in project
 **/

import main     from 'michaelbakker196_concurrently'
import { exec } from 'child_process'

exec('cd model-tests && npm link ../excel-connect --no-update-notifier ', (err, output) => {
	console.info(output)
	main([
		'cd excel-connect && npm install  --no-update-notifier  --no-optional',
		'cd ffl && npm install --no-update-notifier  --no-optional',
		'cd lme-core && npm install --no-update-notifier  --no-optional',
		'cd model-tests && npm install --no-update-notifier --no-optional',
		'cd lme-model-api && npm install --no-update-notifier  --no-optional',
		'cd log && npm install --no-update-notifier  --no-optional'])
})