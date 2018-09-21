import { FFLToRegister, RegisterToFFL } from '../index.js'
import { Register }                     from 'lme-core'
import { source_ffl, target_ffl }       from './Util'
import { info }                         from 'log6'

const base_register = new Register, target_register = new Register

new FFLToRegister(base_register, source_ffl, false).parseProperties()
new FFLToRegister(target_register, target_ffl, false).parseProperties()

const ffl = new RegisterToFFL(base_register).toGeneratedFFL({ auto_join: true })
info(ffl)
info(new RegisterToFFL(base_register).toCSV({}))

const target = new FFLToRegister(new Register, ffl, true).parseProperties(true)
info(Object.keys(target.getNames()))
