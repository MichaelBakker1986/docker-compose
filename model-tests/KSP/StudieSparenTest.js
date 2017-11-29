
var formulaJS = require('formulajs')
var studieDuurInmaanden = 48
var Studie = 70.000;
var Algespaard = 10.000;
var PERMAAND_VERDIENSTEN = 200;//$1
var StudieleningPerMaand = 200;//$2;
const LeeftTijdKind = 17;//$3;
var OpbrengstenBijbaantje = (PERMAAND_VERDIENSTEN * studieDuurInmaanden);// = € 2.400,- //4jaar
var Studielening = (StudieleningPerMaand * studieDuurInmaanden);
var Spaardoel = 70.000 - (OpbrengstenBijbaantje + Studielening);
var Aantalmaandentesparen = (LeeftTijdKind - 0) * 12;
var RentePercentagePerJaar = 2.75;
//Met de rente van 2,75% betekent dit dat je ~ € 247,36 per maand moet inleggen.
const rentePerMaand = RentePercentagePerJaar / 1200;// 0.00229166666666667;
const referentieMaandPunt = 1;
var ENG = formulaJS.PPMT(rentePerMaand, referentieMaandPunt, Aantalmaandentesparen, 0, Spaardoel)
console.info(ENG)