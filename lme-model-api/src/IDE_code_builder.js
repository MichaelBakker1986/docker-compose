import { HotDeploy }          from './hot_deploy'
import express_promise_router from 'express-promise-router'

const IDECodeBuilder = express_promise_router()

//AnalyseWeb.get('/:web_page.html', async ({ params = {} }, res) => res.sendFile(__dirname + `/web/${params.web_page}.html`))
async function go() {
	new HotDeploy(IDECodeBuilder, '/ide.js')
	new HotDeploy(IDECodeBuilder, '/excelide.js')
	//new HotDeploy(IDECodeBuilder, '/uishowcase.js')
}

go().catch(err => console.error(err))
export default IDECodeBuilder