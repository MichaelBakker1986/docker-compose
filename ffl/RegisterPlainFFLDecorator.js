/**
 * Backwards compatible decorator, until all unit-tests success it will serve to fix bugs.
 */
import { Register }        from '../lme-core/index'
import { FFLToRegister }   from './FFLToRegister'
import RegisterToLMEParser from './RegisterToLMEParser'

const RegisterPlainFFLDecorator = {
	name      : 'ffl',
	status    : 'green',
	headername: '.finance ffl',
	deParse   : (data, workbook) => new RegisterToLMEParser().deParse(data, workbook),
	parseData : (data, workbook) => {
		/*
		 * Backward compatibility:
		 * Allow the register to be provided
		 */
		const register = data.register || new Register
		const raw_model_data = data.raw || data

		const fflFormatter = new FFLToRegister(register, raw_model_data)
		fflFormatter.parseProperties()
		workbook.modelName = fflFormatter.name || workbook.modelName
		return new RegisterToLMEParser().parseData(register, workbook)
	}
}
export default RegisterPlainFFLDecorator