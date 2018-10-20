import { exec } from 'child-process-promise'
import { info } from 'log6'

async function open_shell() {
	const { stdout } = await exec('ssh -m hmac-sha2-256 michael.bakker@blfif-cv-lme01.finance.lab')
	info(stdout)
}

open_shell()