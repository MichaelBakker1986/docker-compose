var request = require('request')
var rp = require('request-promise');
var counter = 1000;
var modelAPI = require('../src/lme')
var newModel = new modelAPI();
newModel.importLME(require('../public/json/KSP_canvas.json'));

class IntegrationTest {
    constructor() {
        this.host = "http://blfif-tv-tr03.finance.lab:808";
        this.fflFile = '\nmodel KSP uses BaseModel\n{' + newModel.exportFFL() + "\n}";
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    post(type, url, data) {
        request({
            url: this.host + url,
            method: type,
            json: data,
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log('sucess!');
            } else {
                console.log('error' + response);
            }
        });
    }

    requestLoops(type, url, data) {
        this.post(type, url, data)
        setTimeout(() => {
            requestLoops(type, url, data)
        }, this.getRandomInt(100, 600) * 100);
    }

    testAll() {
        this.requestLoops("GET", "0/models")
        this.requestLoops("GET", "0/DEMO/transformFFL_LME/KSP")
        this.requestLoops("GET", "0/branches")
        this.requestLoops("POST", "0/TEST/saveFFL_LME", {
            model: 'TEST',
            data: '//' + counter++ + '\n' + this.fflFile
        })

    }
}

new IntegrationTest().testAll();
