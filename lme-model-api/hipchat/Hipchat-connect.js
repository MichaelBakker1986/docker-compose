import request                      from 'request'
import { debug, DEBUG, info, warn } from 'log6'

const host_environment_variable = process.env.HOST
const host = host_environment_variable || '127.0.0.1'
const domain = process.env.DOMAIN
const hipchat_api_key = process.env.HIPCHAT_API_KEY
const hipchat_endpoint = `https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=${hipchat_api_key}`
const developer = (host === 'localhost')

class HipchatConnect {
	constructor() {
		if (!hipchat_api_key) warn('No communication with the HipChat server is possible, because environment variable HIPCHAT_API_KEY is not set.')
		if (!host_environment_variable) info('Not communicating with the HipChat server, because environment variable HOST is not set. Assume developer build.')
	}

	send(text, level) {
		request.post({
				url : hipchat_endpoint,
				json: { 'color': level, 'message': '[' + domain + '] ' + text }
			}, (err) => {
				if (err && DEBUG) debug(err.toString())
			}
		)
	}

	log(message, levelArg) {
		if (message && !developer) {
			this.send(message, levelArg || 'green')
		}
		info(message)
	}
}

module.exports = new HipchatConnect()