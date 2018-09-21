//Convert into JBehave
import { info }       from 'log6'
import * as formulaJS from 'formulajs'

const studieDuurInMaanden = 48
const EDUCATION_COST = 70.000
const Algespaard = 10.000

const EducationSideJob = 200//$1
const MonthlyEducationLoan = 200//$2;
const EducationAgeChild = 17//$3;

const revenuesSideJob = (EducationSideJob * studieDuurInMaanden)// = € 2.400,- //4jaar
const Studielening = (MonthlyEducationLoan * studieDuurInMaanden)

const Spaardoel = 70.000 - (revenuesSideJob + Studielening)
const Aantalmaandentesparen = (EducationAgeChild - 0) * 12
const RentePercentagePerJaar = 2.75
//Met de rente van 2,75% betekent dit dat je ~ € 247,36 per maand moet inleggen.
const rentePerMaand = RentePercentagePerJaar / 1200// 0.00229166666666667;
const referentieMaandPunt = 1

info(formulaJS.PPMT(rentePerMaand, referentieMaandPunt, Aantalmaandentesparen, 0, Spaardoel))