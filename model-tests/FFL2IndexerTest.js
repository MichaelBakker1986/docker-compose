//create an index
const PropertiesModuleFFLFormat = require('../lme-core/exchange_modules/ffl2/PropertiesModuleFFLFormatter').PropertiesModuleFFLFormat
const Register = require('../lme-core/exchange_modules/ffl2/Register').Register
const modelRegister = new Register();

const RegisterToFFL = require('../lme-core/exchange_modules/ffl2/RegisterToFFL').RegisterToFFL

const ffl = require('fs').readFileSync('../git-connect/resources/KSP.ffl', 'utf-8')
const fllToIndex = new PropertiesModuleFFLFormat(modelRegister).parse(ffl);


//place the index in the FFl2Indexer and print the result
console.info(new RegisterToFFL(modelRegister, fllToIndex).toGeneratedFFL());

