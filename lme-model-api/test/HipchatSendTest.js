import request         from 'request'
import { hostname }    from 'os'
import uuid            from 'uuid4'
import { error, info } from 'log6'

const host_name = hostname()
const name = 'KSP'

function send(message) {
	request.post({
			url : `https://topicus.hipchat.com/v2/room/4235024/notification?auth_token=${process.env.HIPCHAT_API_KEY}`,
			json: { 'color': 'green', 'message': message }
		}, (err) => {
			if (err) error(err)
			info(err ? `${err}` : 'Hipchat post ok')
		}
	)
}

send(`<span>ffl model update:</span><a href="http://${host_name}:8083/#${name}&${uuid()}">${name}</a><span>${name}</span>`)
