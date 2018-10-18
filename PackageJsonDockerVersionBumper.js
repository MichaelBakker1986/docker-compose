/**
 * @DEPRECATED
 */
import { error, info } from 'log6'
import fs              from 'fs'
import cp              from 'child-process-es6-promise'
import packageInfo     from './package.json'
//store for revert
const old_module_version = packageInfo.version
//major version bumb
packageInfo.version = String(parseInt(packageInfo.version.split('.')[0]) + 1) + '.0.0'
const module_tag_name = `${packageInfo.author.split('@')[0].replace(/\W/g, '').toLowerCase()}/${packageInfo.name}:${packageInfo.version}`

fs.writeFileSync('./package.json', JSON.stringify(packageInfo, null, 2), 'utf8')

const r_file = `${__dirname}/${packageInfo.main}`
b.require(r_file, { expose: r_file })
const res = fs.createWriteStream(`${__dirname}/dist/${(packageInfo.name).replace(/\W/gmi, '_').toLowerCase()}.js`)

function revertUpdate(message) {
	error(message)
	packageInfo.version = old_module_version
	fs.writeFileSync('./package.json', JSON.stringify(packageInfo, null, 2), 'utf8')
}

res.on('finish', () => {
	info(`Done browserfiy module ${module_tag_name}`)
	const command = `build . -t=${module_tag_name}`
	cp.spawn('docker', command.split(' '), { stdio: 'inherit' }).then(result => {
		if (result.code === 0) {
			cp.spawn('docker', ['push', module_tag_name], { stdio: 'inherit' }).then(() => {
				return info(`Docker image pushed ${module_tag_name}`)
			}).catch((error) => revertUpdate(`failed to push docker image ${module_tag_name}\n${error.toString()}`))
		} else revertUpdate('Failed to build docker image')
	}).catch((error) => revertUpdate('failed to create docker image \n' + error.toString()))
})
