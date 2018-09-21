import { info }                             from 'log6'
import { readFileSync }                     from 'fs'
import * as fflMath                         from '../../math/ffl-math'
import api, { Context, ENCODING, WorkBook } from '../../lme-core/index'
import { RegisterPlainFFLDecorator }        from '../../ffl/index'

const fflModelName = 'deps'
api.registerParser(RegisterPlainFFLDecorator)
api.addFunctions(fflMath)
const data = readFileSync(`${__dirname}/${fflModelName}.ffl`, ENCODING)
const wb = new WorkBook(new Context())
wb.importFFL(data)

info(wb.getDependencies('DepHost'))
info(wb.getDependencies('ReferencedVar'))