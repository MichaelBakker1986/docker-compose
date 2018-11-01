import { REFERS_TO_PROPERTY_NAME } from './Constants'

export class Validator {
	constructor(register) {
		this._register = register
		this._validate_result = {}
	}

	validateRefersto() {
		const register = this._register
		const names = register.getAllValuesForColumn('name')
		const refers_to = register.getAllValuesForColumn(REFERS_TO_PROPERTY_NAME)
		const missing_variables =
			      [... refers_to].filter(refers_to => refers_to)//filter nulls
			      .filter((refersto) => !names.has(refersto)) //filter variables

		const variable_errors = missing_variables.map(refers_to =>// get missing ones
			register.find(REFERS_TO_PROPERTY_NAME, refers_to))// multiply with occurrences,
		.flat().map(n => register.humanNode(n))    // flatten, convert to Nodes

		this._validate_result.refersto = {
			fail                  : missing_variables.length > 0,
			missing_variable_names: variable_errors,
			toString() {
				return variable_errors.map(n => `variable ${n.name} refers missing ${n[REFERS_TO_PROPERTY_NAME]}`).join('\n')
			}
		}
	}

	validateIntegrity() {
		this.validateRefersto()
		this.update_final_result()
	}

	update_final_result() {
		this._validate_result.fail = this._validate_result.refersto.fail
		this._validate_result.toString = () => this._validate_result.refersto.toString()
	}

	feedBack() {
		return this._validate_result
	}
}