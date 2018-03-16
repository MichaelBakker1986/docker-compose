const assert        = require('assert'),
      log           = require('log6'),
      Register      = require('../exchange_modules/ffl/Register').Register,
      ChangeManager = require('../exchange_modules/ffl/ChangeManager').ChangeManager

const register = new Register()
register.addRow(['abc', 1, 10, 'testVar', null, 'modifier', 'parentId', 'tuple', 'SUPERVAR'])
register.addRow(['abc', 10, 20, 'SUPERVAR', 'index', 'modifier', 'parentId', 'tuple', null])
const inherited = register.createInformationObject('testVar', [])
assert(inherited[4].value == 'index')

var noneexit = true;
var data = "OnNA(Max(0,PPMT(RentePerJaar/1200,1,AantalMaandenTeSparen,-(70000 - (SavedMoney + (MonthlyIncomeBijBaan*48)+(MonthlyDUOLoan*48))))),0)"
//var data = 'Matrix(abc,more("TEST",OnNA(a,OnZero(x,z,a+1+2+3),OnZero(x,z,a),c),x))'
var id = -1;

const map = []
while (noneexit) {
    noneexit = false;
    data = data.replace(/\w+\(([^)(]*?)\),?/gm, function($0, $1, $2) {
        noneexit = true;
        map[++id] = $0//'\n' + all.join(' ') + $0.replace(/\(/gim, '_').replace(/\)/gmi, '%') + '\n'
        return "__" + id
    })
}

const allInner = []
noneexit = true;
const all = []
var depth = 0;
while (noneexit) {
    noneexit = false;
    data = data.replace(/__\d+/gm, function($0, $1, $2, $3, $4) {
        noneexit = true;
        all.length = all.length || this.lastIndex || $1
        const tot = []
        if ($2.indexOf('(') > -1) tot.push('\n' + all.join(' '))
        var currIndent = 0
        const newItem = map[parseInt($0.substring(2))].replace(/\+|\-/gm, function(a, b, c, d) {
            // allInner.length = b
            return '\n         ' + all.join(' ') + a
        });
        tot.push(newItem)
        //if (newItem.indexOf('(') > -1)
        //  if (newItem.indexOf(')') > -1) depth--
        if ($2.indexOf(')') > -1) tot.push('\n' + all.join(' '))
        return tot.join('')
    })
}
log.debug(data)