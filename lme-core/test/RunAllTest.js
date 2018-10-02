/*
 * (i)(!) There is no way to clear State, every doImport will contribute to static state
 */
import { debug, error, info } from 'log6'
import { glob }               from 'glob'
import path                   from 'path'

const excluded_tests = new Set([])
process.alltest = true
const results = [], failures = [], performanceTestStartTime = new Date().getTime()

const test_files = glob.sync('**/*[T|t]est.js')
test_files.filter(test => !excluded_tests.has(test)).forEach(testName => {
	const startTime = new Date().getTime()
	results.push([testName, startTime, 'start'])
	try {
		require(path.join(__dirname, testName))
	}
	catch (e) {
		failures.push(e)
		error(`Error in file:${testName}\nDoes the file exist?`, e)
	}
	const endTime = new Date().getTime()
	failures.forEach(failure => results.push([testName, failure]))
	results.push([testName, endTime, 'end', (endTime - startTime)])
})
const totalTestTime = (new Date().getTime() - performanceTestStartTime)
results.push(['performanceTest', 'total', totalTestTime])

results.forEach((testResult) => debug(testResult))
if (totalTestTime > 9500) error('Total time exceeded')
if (failures.length > 0) {
	error(`A test failed${failures}`)
	process.exit(1)
} else info(`All test success in ${totalTestTime}ms`)

module.exports = { results }
export { results }
