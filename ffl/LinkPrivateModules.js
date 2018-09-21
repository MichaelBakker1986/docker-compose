/**
 * script to bind private modules (good for dev)
 */
import { exec }        from 'child_process'
import { error, info } from 'log6'

['lme-core'].forEach(module => {
	exec(`npm link ../${module}`, (err, stdout) => {
		if (err) return error(err)
		info(stdout)
	})
})