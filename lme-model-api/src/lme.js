import { RegisterPlainFFLDecorator } from '../../ffl/index'
import api, {
	Context,
	JSONParser,
	LMEParser,
	TimeAxis,
	WebExportParser,
	WorkBook,
	XAxis as BkYearTimeModel
}                                    from '../../lme-core/index'

import formulaJs from '../../formulajs-connect/formulajs'
import fflMath   from '../../math/ffl-math'

const DEFAULT_MODELNAME = 'SCORECARDTESTMODEL'
api.registerParser(RegisterPlainFFLDecorator, JSONParser, LMEParser, WebExportParser)
api.addFunctions(formulaJs, fflMath)

function LmeAPI(TimeModel, Ctx, interval, options) {
	//TODO: the TimeModel is part of the Context object.

	if (TimeModel) this.lme = new WorkBook(Ctx || new Context, new TimeAxis(TimeModel), interval)
	else this.lme = new WorkBook(Ctx || new Context, new BkYearTimeModel, interval)

	this.modelName = undefined
	this.urlPrefix = ''
	Object.assign(this, options)
	if (options && options.ffl) this.importFFL(options.ffl)
}

LmeAPI.prototype.hasChanges = function() {
	return this.lme.context.hasChanges()
}
LmeAPI.prototype.getTimeViews = function() {
	return this.lme.getTimeViews()
}
LmeAPI.prototype.addFunctions = api.addFunctions
LmeAPI.prototype.exportLME = function() {
	return this.lme.export('lme')
}
LmeAPI.prototype.importLME = function(json) {
	this.lme.importSolution(json, 'lme')
}
LmeAPI.prototype.exportJavaScript = function() {
	return this.lme.export('js')
}
/**
 * Not used in Client UI input rendering
 */
LmeAPI.prototype.importFFL = function(ffl) {
	this.lme.importFFL(ffl)
}
LmeAPI.prototype.setColumnOffset = function(delta) {
	this.lme.setColumnOffset(delta)
}
LmeAPI.prototype.exportFFL = function() {
	return this.lme.export('ffl')
}
LmeAPI.prototype.exportWebModel = function(rootNode) {
	return this.lme.export('webexport', rootNode)
}
LmeAPI.prototype.importWebModel = function(webDesign) {
	return this.lme.importSolution(webDesign, 'webexport')
}
LmeAPI.prototype.exportData = function() {
	return this.lme.export('jsonvalues')
}
LmeAPI.prototype.importData = function(valueAsJSON) {
	this.lme.importSolution(valueAsJSON, 'jsonvalues')
}
/**
 * use modelName from this.lme.modelName
 * use token form this.lme.context.uuid
 */
LmeAPI.prototype.loadData = function(callBack, id) {
	const self = this
	let params = window.location.href.split('#')
	if (params.length === 1) window.location.href = `#${DEFAULT_MODELNAME}&DEMO&6`
	params = window.location.href.split('#')[1].split('&')
	const columnSize = parseInt(params.length > 2 ? (params[2] || '6') : '6')
	self.modelName = params[0] || DEFAULT_MODELNAME
	const userID = (params[1] || 'DEMO')
	const model_version = this.user_session ? (this.user_session.model_version || '0.20') : '0.20'
	self.lme.context.saveToken = userID
	const http = new XMLHttpRequest()
	const url = `/${self.modelName}/${model_version}/data/${id || userID}`
	http.open('GET', url, true)
	http.setRequestHeader('Content-type', 'application/json')
	http.onreadystatechange = function() {//Call a function when the state changes.
		if (http.readyState === 4 && http.status === 200) {
			const returnData = JSON.parse(http.responseText)
			self.lme.context.saveToken = returnData.id.indexOf(',') > 0 ? userID : returnData.id
			self.importData(returnData)
			window.location.href = `#${self.modelName}&${self.lme.context.saveToken}&${columnSize}`
		}
	}
	// noinspection JSCheckFunctionSignatures
	http.onload = function() {
		self.lme.context.audit = []
		self.lme.context.calc_count++
		callBack(http.responseText)
	}
	try {
		http.send()
	} catch (err) {
		console.error(err)
	}
	return http
}

LmeAPI.prototype.persistData = function(callBack) {
	const params = window.location.href.split('#')[1].split('&')
	const self = this
	//send data to server to store
	if (params.length === 1) window.location.href = `#${DEFAULT_MODELNAME}&DEMO&6`
	self.modelName = params[0] || DEFAULT_MODELNAME
	const userID = params[1] || 'DEMO'
	const columnSize = parseInt(params.length > 1 ? (params[2] || '6') : '6')
	self.lme.context.saveToken = userID
	const model_version = this.user_session ? (this.user_session.model_version || '0.20') : '0.20'
	const model_name = this.user_session ? (this.user_session.fflModelPath || 'KSP2') : 'KSP2'
	const http = new XMLHttpRequest()
	http.open('POST', `/${model_name}/${model_version}/saveUserData/${self.lme.context.saveToken}`, true)
	http.setRequestHeader('Content-Type', 'application/json')
	http.onreadystatechange = function() {//Call a function when the state changes.
		if (http.readyState === 4 && http.status === 200) {
			const returnData = JSON.parse(http.responseText)
			self.lme.context.saveToken = returnData.saveToken
			window.location.href = `#${self.modelName}&${self.lme.context.saveToken}&${columnSize}`
		}
	}
	// noinspection JSCheckFunctionSignatures
	http.onload = () => {
		self.lme.context.audit = []
		self.lme.context.calc_count++
		callBack(http.responseText)
	}
	http.send(JSON.stringify({ data: self.exportData() }))
	return http
}
export { LmeAPI }