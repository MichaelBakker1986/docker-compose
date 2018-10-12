/**
 * Run all tests in project
 **/

import main                                                        from 'michaelbakker196_concurrently'
import { exists, existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { info }                                                    from 'log6'
import path                                                        from 'path'
import { exec }                                                    from 'child-process-promise'

const path_info = __dirname

async function getModules() {
	return new Promise((accept, reject) => {
		const files = []
		const items = readdirSync(path_info)
		items.forEach(item => {
			const module_directory = path.join(path_info, item)
			const stats = statSync(module_directory)
			if (stats.isDirectory()) {
				const package_info_file = path.join(module_directory, 'package.json')
				const exists = existsSync(package_info_file)
				if (exists) {
					const package_info_data = JSON.parse(readFileSync(package_info_file, 'utf8'))
					if (package_info_data.author === 'michael.bakker1986@gmail.com') {
						files.push(module_directory)
					}
				}
			}
		})
		accept(files)
	})
}

Promise.all([
	exec('cd model-tests'),
	exec('cd model-tests'),
	/*exec('cd model-tests && npm link ../math --no-update-notifier ').then(({ stdout, stderr }) => info(stdout)),
	 exec('cd model-tests && npm link ../excel-connect --no-update-notifier ').then(({ stdout, stderr }) => info(stdout)),*/
	getModules()
])
.catch(err => {console.error(err)}).then(([link_math, link_excel_connect, modules]) => {
	const relative_module_path = modules.map(module => path.relative(__dirname, module))
	const commands = relative_module_path.map(path => `echo Installing module ${path} && cd ${path} && npm install --no-update-notifier --no-optional`)
	main(commands)
})

class Installer {
	constructor() {
		const modules = []
		exec('cd model-tests && npm link ../math --no-update-notifier ', (err, output) => {
			info(output)
			exec('cd model-tests && npm link ../excel-connect --no-update-notifier ', (err, output) => {
				info(output)
				main([
					'cd excel-connect && npm install --no-update-notifier --no-optional',
					'cd ffl && npm install --no-update-notifier  --no-optional',
					'cd lme-core && npm install --no-update-notifier  --no-optional',
					'cd model-tests && npm install --no-update-notifier --no-optional',
					'cd lme-model-api && npm install --no-update-notifier --no-optional',
					'cd log && npm install --no-update-notifier --no-optional'])
			})
		})
	}
}

//new Installer()
