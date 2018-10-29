import express from 'express'

import { EndpointCreator } from './EndpointCreator'

const router = express.Router()

let endpointCreator = new EndpointCreator()
endpointCreator.addDummyEndpoint()

router.get('/add/:endpoint', async (req, res) => {
	try {
		const { endpoint } = req.params
		const [name, version] = endpoint.split(':')
		endpointCreator.addEndPoint({ endpoint_name: name, model_version: version })
		res.json({ message: `created ${name}:${version}` })
	} catch (e) {
		console.error(e)
	}
})
router.get('/', async (req, res) => {
	endpointCreator.killAll()
	res.json({})
})

export default router
