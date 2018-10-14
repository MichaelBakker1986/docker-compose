/**
 * Find all *.test in model-test
 * Run them all in separate processes.
 * (!) don't call this class Test, it will be cyclic.
 **/
import { debug, DEBUG, error, info } from 'log6'
import FileWalker                    from '../git-connect/FileWalker'
import { exec }                      from 'child-process-promise'

const modelTests = new FileWalker(__dirname + '/core_integration', ['*Test*', '*/*Test*', '*/*/*Test*', '*/*/*/*Test*', '*/*/*/*/*Test*'], '.js')
const modelTestsJBehave = new FileWalker(__dirname + '/JBehave', ['*Test*', '*/*Test*', '*/*/*Test*', '*/*/*/*Test*', '*/*/*/*/*Test*'], '.js')

const promises = [modelTests, modelTestsJBehave].map(el => el.walk(async (file_path) => {
	if (file_path.indexOf('node_modules') > -1) return [file_path, true, 'Skipped']  //exclude 3rd party.
	return exec(`node -r babel-register "${file_path}"`).then((result) => {
		if (DEBUG) debug(`${result.childProcess.pid} - [${file_path}]`)
		//check outputs
		if (result.stderr) return [file_path, false, result.stderr]
		else return [file_path, true, result.stdout]
	}).catch(err => [file_path, false, err.toString()])
}, true))

Promise.all(promises).then(results_array => {
	let all_success = true
	const errors = []
	results_array.forEach(results => {
		//check results
		results.forEach(([path, success, reason]) => {
			if (!success) {
				all_success = false
				errors.push([path, success, reason])
			}
			if (DEBUG) debug(`${path} success=${success} because=${reason}`)
		})

	})
	if (!all_success) {
		error('At least one test fails in model-tests')
		errors.forEach(([test, success, reason]) => {
			if (!success) error(`${test} failed. Because ${reason}`)
		})
		process.exit(1)
	} else info('All tests success in model-tests')
})