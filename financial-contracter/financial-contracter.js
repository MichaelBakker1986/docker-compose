import { DeltaCompareRegister, Formatter, Register } from 'ffl-pack'
import log                                           from 'log6'

const dummy_orig = `
model SCORECARDBASICS uses BaseModel
{
 variable Q_ROOT
 {
  display_options:scorecard;
  variable FirstMAP
  {
   title: "FirstMAP";
   datatype: number(2);
  }
 }
}`

export class Contracter {

	db_entries = []

	getContractDelta(root_hash, data_id, data) {
		const compareResults = this.doDeltaCompare(root_hash, dummy_orig, data)
		if (compareResults.status === 'ok' && compareResults.changes > 0) {
			const relativeFFLPath = root_hash
			const create_time = new Date().getTime()
			compareResults.compare.forEach(([name, from, to, delta]) => {
				this.db_entries.push({ data_id, time: create_time, modelname: relativeFFLPath, root_hash, from, to, delta })
			})
		}
	}

	saveDelta(name, data) {
		return this.getContractDelta(name, data)
	}

	doDeltaCompare(name, source_data, target_data) {
		const source_register = new Register()
		new Formatter(source_register, source_data).parseProperties()
		const target_register = new Register()
		new Formatter(target_register, target_data).parseProperties()
		const database_compare = new DeltaCompareRegister(source_register, target_register)
		database_compare.compare()
		if (log.TRACE) log.trace(database_compare)
		return { status: 'ok', changes: database_compare.changes, compare: database_compare }
	}

	getEntries = () => this.db_entries
}