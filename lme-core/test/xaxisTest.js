import { TimeAxis, XAxis as BookYearTime } from '../index'
import { equal }                           from 'assert'
import customImport                        from '../resources/CustomImport.json'

const bookYearXAxis = new BookYearTime()
const monthlyTime = new TimeAxis(customImport)

equal(bookYearXAxis.viewmodes.bkyr.cols.length, 19, `We use 40columns for now but found${bookYearXAxis.viewmodes.bkyr.cols.length}`)
equal(monthlyTime.viewmodes.detl.cols.length, 252, 'We use 252 detail columns for months ')