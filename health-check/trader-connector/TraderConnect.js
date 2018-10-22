import RethinkDBDash from 'rethinkdbdash'
import { info }      from 'log6'

const DB_NAME = 'healthcare'
let host = process.env.CLOUD_DB_HOST
info(`Connecting to cloud database ${host}`)

const r = RethinkDBDash({
	servers: [{ host, port: 28015, db: DB_NAME }],
	pool   : true,
	user   : 'admin',
	timeout: 500000
})
const audit = r.table('audit')

function drain() {
	r.getPool().drain()
}

export { audit, r, drain }                                 