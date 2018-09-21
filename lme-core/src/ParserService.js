/*
 register/resolve exchange modules e.g. ffl,screen_definition,presentation
 */
/*Class Parser
 {
 name: String,
 headerName: String,
 parse: Function(Context) : Solution
 deParse: Function() : Export
 }
 */
import { debug, DEBUG } from 'log6'

const parsers = {}

class ParserService {

	static addParser(parser) {
		if (!parser || !parser.headername) throw Error(`Invalid parser ${JSON.stringify(parser)}`)
		if (DEBUG) debug(`Adding parser ${parser.headername}`)
		parsers[parser.name] = parser
	}

	static visitParsers(visitFunction) {
		Object.keys(parsers).forEach(parser => visitFunction(parser))
	}

	static findParser(parserName) {
		return parsers[parserName]
	}

}

export default ParserService