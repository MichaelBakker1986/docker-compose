/**
 * Run all tests in project
 **/

import main                                                from 'michaelbakker196_concurrently'
import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { error, info }                                     from 'log6'
import path                                                from 'path'
import { exec }                                            from 'child-process-promise'

const path_info = __dirname

async function getModules() {
	return new Promise((accept) => {
		const files = [path.join(__dirname, '/financiallanguageconverter/DatastoreCluster')]
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
						if (package_info_data.name !== 'michaelbakker-tracer')
							files.push(module_directory)
					}
				}
			}
		})
		accept(files)
	})
}

Promise.all([
	exec('cd model-tests && npm link ../math --no-update-notifier').then(({ stdout }) => info(stdout)).catch(err => { error(err)}),
	exec('cd model-tests && npm link ../excel-connect --no-update-notifier').then(({ stdout }) => info(stdout)).catch(err => { error(err)}),
	getModules()
])
.catch(err => {console.error(err)}).then(([link_math, link_excel_connect, modules]) => {
	const relative_module_path = modules.map(module => path.relative(__dirname, module))
	const commands = relative_module_path.map(path => `echo Installing module ${path} && cd ${path} && npm install --no-update-notifier --no-optional`)
	main(commands)
})
//docker run -p 8080:7081 --name lme_platform -e ENABLED_MODELS="KSP"  michaelbakker1986/lme:0.0.8
//docker run -p 8080:7081 --name lmeplatform michaelbakker1986/lme:0.0.8 -e "ENABLED_MODELS=KSP"