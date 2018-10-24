import speedTest from 'speedtest-net'
import { info }  from 'log6'
import moment    from 'moment'
import { audit } from './TraderConnect'
import { v4 }    from 'public-ip'

let interval = 10000, ip

async function redoTheTest({}) {
	const test = speedTest({})
	test.on('data', data => printResultsAndRedoTest(data))
	test.on('error', err => {
		console.error(err)
		printResultsAndRedoTest({ speeds: { download: 'err' } })
	})
}

function printResultsAndRedoTest({ client = {}, server = {}, speeds = {} }) {
	const now = moment()
	const { ping = 999.999 } = server
	const { download = 0, upload = 0 } = speeds
	const { isp } = client
	let message = `${ip} : ${String(now.format('YY-MM-DD hh:mm:ssa')).padEnd(19)} ${ping.toFixed(1).padStart(4)}ms ${String(download.toFixed(0).padStart(3))}/${upload.toFixed(0).padEnd(3)} ${isp.padEnd(30)}`
	info(message)
	audit.insert({
		create_time: new Date().getTime(),
		ping, download, upload, isp, ip, interval
	}).then(() => {}).catch(() => {})
	setTimeout(async () => {
		await redoTheTest({})
	}, interval)
}

v4().then(ip_address => {
	info(`Current ip address ${ip_address}`)
	ip = ip_address
	interval = 10000
	redoTheTest({}).then(() => {}).catch(() => {})
})