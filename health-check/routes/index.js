import express        from 'express'
import { HealthCare } from '../trader-connector/HealthCare'

const router = express.Router()
const healthcare = HealthCare

const html = `
<html><head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>Highcharts Demo</title>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  body {
  background: #fff;
}
  </style>
</head>
<body>

<script src="chart.js"></script>
<div id="container" style="height: 400px; min-width: 310px"></div>
  
</body>
</html>`

router.get('/index.html', async (req, res) => {
	res.end(html)
})
router.get('/data.json', async (req, res) => {
	const audit = await healthcare.raw(req.query.last_create_time)
	const min_data = audit.map(({ upload, download, create_time, id }) => ([create_time, download, id]))
	res.json(min_data)
})

export default router
