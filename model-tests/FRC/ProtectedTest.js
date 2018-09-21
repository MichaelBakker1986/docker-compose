import { Context, WorkBook } from '../../lme-core'
import { info }              from 'log6'
import { Register }          from '../../lme-core/exchange_modules/'
import '../../lme-model-api/src/lme'
import '../../lme-core/exchange_modules/ffl/RegisterToLMEParser'
import { readFileSync }      from 'fs'
import 'ffl-math'

const ffl = readFileSync(__dirname + '/ProtectedTest.ffl', 'utf8')

const register = new Register()
const wb = new WorkBook(new Context())
wb.importFFL({ register, raw: ffl })
info(JSON.stringify(JSON.parse(wb.export('lme')), null, 2))
