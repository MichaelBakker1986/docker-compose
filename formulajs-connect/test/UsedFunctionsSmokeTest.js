import { info }    from 'log6'
import { entries } from '../formulajs'
import { ok }      from 'assert'

const excel_functions = Object.keys(entries)
ok(excel_functions.includes('PPMT'))
info(excel_functions)