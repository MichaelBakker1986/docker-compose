import { Register } from '../../lme-core/index'
import log          from 'log6'

export const groupBy = (xs, key) => xs.reduce((rv, x) => {
	(rv[x[key]] = rv[x[key]] || []).push(x)
	return rv
}, {})
export const converter = (values, target_register) => {
	let group = groupBy(values, 'var')
	Object.keys(group).forEach(variable_name => {
		const variable = group[variable_name]
		const variable_index = target_register.addRow([null, null, null, variable[0].var])
		variable.forEach(({ col, val }) => {
			target_register.addColumn(col)
			target_register.value(variable_index, col, val)
		})
	})
	return target_register
}
export const testData = (data) => converter(data, new Register)
export const info = (p) => p.then(ok => log.info(JSON.stringify(ok, null, 2))).catch(err => log.error(err))
export const source_ffl = `
model SCORECARDBASICS uses BaseModel
{
 ffl_version: "1.1";
 variable Q_ROOT
 {
  display_options:scorecard;
  variable FirstMAP
  {
   formula: 100;
   title: "FirstMAP";
   datatype: number(2);
  }
 }
}`
export const target_ffl = `
model SCORECARDBASICS uses BaseModel
{
 variable Q_ROOT
 {
  title: "FirstMAP";
  display_options:scorecard;
  variable FirstMAP
  {
   datatype: num2ber(2);
   promote: promote;
  }
 }
}`