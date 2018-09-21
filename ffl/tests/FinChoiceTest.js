import { FinFormula } from '../FinFormula'
import { equal }      from 'assert'

equal(JSON.parse(new FinFormula().finChoice('0:VWO|1:VMBO-MBO|2:VMBO-HAVO|3:HAVO')).length, 4)