/**
 * Find all *.test in model-test
 * Run them all in separate processes.
 * (!) don't call this class Test, it will be cyclic.
 **/
import { debug, DEBUG, error, info } from 'log6'
import { exec }                      from 'child-process-promise'
import FileWalker                    from '../git-connect/FileWalker'

const modelTests = new FileWalker(__dirname + '/core_integration', ['*Test*', '*/*Test*', '*/*/*Test*', '*/*/*/*Test*', '*/*/*/*/*Test*'], '.js')
const modelTestsJBehave = new FileWalker(__dirname + '/JBehave', ['*Test*', '*/*Test*', '*/*/*Test*', '*/*/*/*Test*', '*/*/*/*/*Test*'], '.js');
[modelTests, modelTestsJBehave].forEach(el => el.walk((file_path) => {
	if (file_path.indexOf('node_modules') > -1) return [file_path, true, 'Skipped']  //exclude 3rd party.
	if (DEBUG) debug(`exec[${file_path}]`)
	return exec(`node -r babel-register "${file_path}"`).then((result) => {
		//check outputs
		if (result.stderr) return [file_path, false, result.stderr]
		else return [file_path, true, result.stdout]
	}).catch(err => [file_path, false, err.toString()])
}, true).then(results => {
	let all_success = true
	//check results
	results.forEach(result => {
		if (!result[1]) all_success = false
		if (DEBUG) debug(`${result[0]}-${result[1]} because ${result[2]}`)
	})
	if (!all_success) {
		error('At least one test fails in model-tests')
		results.forEach(([test, success, reason]) => {
			if (!success) error(`${test} failed. Because ${reason}`)
		})
		process.exit(1)
	} else {
		info('All tests success in model-tests')
	}
}))