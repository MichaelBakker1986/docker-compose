import { REFERS_TO_PROPERTY_NAME } from './Constants'

export class Validator {
	constructor(register) {
		this._register = register
		this._validate_result = {}
	}

	validateRefersto() {
		const names = this._register.getAllValuesForColumn('name')
		const refers_to = this._register.getAllValuesForColumn(REFERS_TO_PROPERTY_NAME)
		const missing_variables = [... refers_to].filter((refersto) => !names.has(refersto))

		const variable_errors = missing_variables.map(refers_to => this._register.find(REFERS_TO_PROPERTY_NAME, refers_to))

		this._validate_result.refersto = {
			fail                  : missing_variables.length > 0,
			missing_variable_names: variable_errors,
			toString() {
				// noinspection JSCheckFunctionSignatures
				return missing_variables.map(([name, referesto]) => `variable ${name} refers missing ${referesto}`).join('\n')
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