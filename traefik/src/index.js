import express from 'express'

import { EndpointCreator } from './DockerInstanceManager'

const router = express.Router()

let endpointCreator = new EndpointCreator()
endpointCreator.addDummyEndpoint()
endpointCreator.buildEndpoints()
endpointCreator.bringServicesUp()

router.get('/add/:endpoint', async (req, res) => {
	try {
		const { endpoint } = req.params
		const [name, version] = endpoint.split(':')
		endpointCreator.addEndPoint(name, version)
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
