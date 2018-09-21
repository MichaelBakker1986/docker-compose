import api, { Context, DOCUMENT, JSONParser, NUMBER, TITLE, VALUE, WebExportParser, WorkBook } from '../index'
import { equal }                                                                               from 'assert'

api.registerParser(JSONParser, WebExportParser)

const wb = new WorkBook(new Context)
wb.modelName = 'JSON_VALUES_TEST'
wb.createFormula('1+1', 'AB', VALUE, false, DOCUMENT, NUMBER)

equal(wb.get('AB'), 2)
wb.set('AB', 'anything')
wb.set('AB', 'anythingelse')
wb.set('AB', 'anythingelse213')
wb.set('AB', 100)
wb.set('AB', 1010)

let exportValues = wb.export('jsonvalues')
equal(exportValues.length, 1, JSON.stringify(exportValues))

wb.createFormula('1+2', 'AB', TITLE)
wb.set('AB', 'anythingTitle', TITLE)

exportValues = wb.export('jsonvalues')
equal(exportValues.length, 2, JSON.stringify(exportValues))

wb.importSolution(JSON.stringify(exportValues), 'jsonvalues')

