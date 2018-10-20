import { spawn } from 'child-process-es6-promise'
import { info }  from 'log6'

spawn('node', '-r babel-register ../../lme-model-api/src/exportLME_FFL KSP'.split(' '), {
	stderr: 'inherit',
	stdio : 'inherit'
}).then((result) => {
	info(result)
}).catch((error) => {
	info(error)
})