import $         from 'jquery'
import HighCarts from 'highcharts/highstock'
import exporting from 'highcharts/modules/exporting'
import moment    from 'moment'

exporting(HighCarts)

$.getJSON('/data.json', function(data) {

	const last_element = data.slice(-1)[0]
	let last_create_time = last_element[0]
	console.info(last_create_time)

	// Create the chart
	const chart = new HighCarts.StockChart({
		chart        : {
			renderTo: 'container',
			events  : {
				load: function() {
					const series = this.series[0]
					setInterval(() => {
						$.getJSON('/data.json', { last_create_time }, function(data) {
							let last_element = data.slice(-1)[0]
							if (last_element) {
								last_create_time = last_element[0]
								console.info(last_create_time)
								console.info(`New points: ${data.length} `, data)
								data.forEach(([x, y]) => {
									series.addPoint([x, y])
								})

							} else {
								console.info('No updates since ' + moment(last_create_time).fromNow())
							}
							/*series.addPoint([1539955800000 + (8000000 * ++index), Math.random() * 200])*/
						})
					}, 5000)
				}
			}
		},
		rangeSelector: {
			selected: 1
		},
		title        : {
			text: 'Speed test'
		},

		series: [{
			name   : 'SPEED TEST',
			data,
			tooltip: {
				valueDecimals: 2
			}
		}]
	})
})
export default function() {
	console.info('dodsadafdsdasdasnedas')
}
if (module.hot) module.hot.accept()