/**
 * Authorized objects:
 *  - Static resources (anonymous)
 *  - FFLModel definitions, versioned and name
 *  - UserData, versioned
 *
 * Authorization dimensions:
 *  - FFLModel * (UserData * Version)
 *
 * Supported:
 *  - Authorization is with model-level. Authors of models can modify existing models
 *  - the request header contain Authorization-module independent authorization header e.g. x-auth-id: hash1
 *
 * Limitation: All user-entered data is in this stage cross-user-accessible,
 *  - the response header should contain newly created hashes when saving
 *  - Authorization state is volatile, once rebooted all authorization except the ones build here are gone.
 *  - Static resources are defined here
 *  - x-auth-id should allow multiple hashes: hash2,hash3 for URL get: data/hash1,hash2
 *  - Admin access is defined here with MichaelFaceBookID
 *
 *  First step is to List all resources  (or groups)
 *   - Group{MODEL_NAME}~temp
 *            \--  resources/MODELNAME.js    - VIEW|EDIT
 *             \-  resources/MODELNAME.story - VIEW|EDIT
 *
 *
 */
const Acl = require('acl');
const rules = require('./Auth.json').rules;

const MichaelFaceBookID = '1683958891676092';
const JorisNijboerFaceBookID = '10213615561315841';
const MonliFacebookID = '369400500137629';
const LGDFacebookID = '10213076901574578';
const MarcoFacebookID = '10159782534605228';
const RuudFacebookID = '1749387815119222';
const JasperRealEstate = '1565119990220779';
const RichardRealEstate = '2023094311299941';
const RamonFBId = '10216226641645779 ';
const BerryFBId = '1960057484255967';
const BerndFBId = '1893680553997744';
const BasNieveldFBId = '1631660686928794';
const HildeFBId = '1551240648324836';
const FYNDOOCREDITRATING = 'FyndooCreditRating'
const MVO = "MVO";
const VIEW_RULE = 'view';
const GUEST_ROLE = 'guest';
const GUEST_USER = 'guest';
const anonymous = {}
const log = require('log6')

class Authorization {
    constructor() {
        this.acl = new Acl(new Acl.memoryBackend());
        this.acl.addUserRoles(MichaelFaceBookID, MichaelFaceBookID)

        //These resources do not require authorization or authentication
        const anonymous_resources = [
            "/resources/SCORECARDTESTMODEL.js",
            '/data-docs',
            '/data-docs/',

            '/figure/KinderSpaarPlan',
            '/figure/LGDCalculationOutputContainer',
            '/figure/PRESCAN/v2',
            '/figure/PRESCAN/v1',
            '/figure/PRESCAN/v3',
            '/figure/' + FYNDOOCREDITRATING,

            '/basic_example.html',
            '/extended_controller.html',
            '/uishowcase.html',
            "/Promotion.html",

            "/bundle.css",
            "/dist/css/skins/_all-skins.min.css",
            "/dist/img/user2-160x160.jpg",
            "/favicon.ico",
            "/ide.js",
            '/data-api-docs',
            "/showcase.js",
            "/ext-searchbox.js",
            "/ui_showcase.js",
            "/dist/js/adminlte.min.js",
            "/dist/js/demo.js",
            "/dist/css/AdminLTE.min.css",
            "/ide.css",
            "/monli.css",
            "/monli.css",
            "/engineonly.js",
            "/style/fresh.css",
            "/style/style.css",
            "/logo-monli.svg",
            "/promotion.js",
            "/bundle.css",
            "/wat_kost_een_studie_header.jpg",
            "/monli.ico",
            "/monli.js",
            "/bootstrap.min.js",
            "/grid_example.css",
            "/scorecard.html",
            "/scorecard.js",
            "/bootstrap.min.js",
            "/ext-language_tools.js",
            "/ace.js",
            "/javascripts/fflmode.js",
            "/theme-tomorrow.js",
            "/snippets/ffl.js",
            "/font-awesome/fonts/fontawesome-webfont.ttf",
            "/font-awesome/fonts/fontawesome-webfont.woff",
            "/font-awesome/fonts/fontawesome-webfont.woff2"
        ]
        for (var i = 0; i < anonymous_resources.length; i++) {
            var resource = anonymous_resources[i];
            anonymous[resource] = true;
        }

        //these resources require Authorization, but are valid with guest account.
        const guest_resources = [
            "/data/DEMO",//THE CROSS-USER-DATA exposure.
            "/saveUserData/DEMO",//THE CROSS-USER-DATA exposure.
            "/ide.html"
        ]
        /*     for (var i = 0; i < guest_resources.length; i++) {
                 this.allow(GUEST_ROLE, guest_resources[i], VIEW_RULE)
             }*/
        /**
         * These resources require facebook login
         */
        this.model_resources = [
            "/resources/{model_name}.js",
            "/resources/{model_name}.story",
            "/excel/{model_name}",
            "/resources/{model_name}.ffl"
        ]
        /**
         * These resources require facebook login
         */
        const data_resources = [
            //IDE-FFL model Instance
            "/HoeveelKostEenStudie.html",
            "/showcase.html",
            "/WatKostEenKind.html",
            "/data/DEMO",              //TODO: DEMO is a various hash of figure-state.
            "/resources/MVO.js",
            "/resources/MVO.story",
            "/excel/MVO",
            "/resources/MVO.ffl",

            "/branches",               //IDE
            "/models",                 //IDE
            "/hasUpdates",             //IDE
            "/update/git/notifyCommit" //IDE
        ]
        /*   for (var i = 0; i < data_resources.length; i++) {
               this.allow(MichaelFaceBookID, data_resources[i], VIEW_RULE)
           }*/
        this.registerUser(GUEST_USER)


        for (var ruleNumer = 0; ruleNumer < rules.length; ruleNumer++) {
            var rule = rules[ruleNumer];
            this.allow(rule.id, rule.resource, rule.role)
        }
        this.addModelPrivileges(MichaelFaceBookID, "TUPLETEST", true);

        this.addModelPrivileges(RamonFBId, MVO, true);
        this.addModelPrivileges(HildeFBId, MVO, true);
        this.addModelPrivileges(RamonFBId, "REALESTATE", true);
        this.addModelPrivileges(RamonFBId, "PRESCAN", true);
        this.addModelPrivileges(MichaelFaceBookID, "PRESCAN", true);
        this.addModelPrivileges(JorisNijboerFaceBookID, FYNDOOCREDITRATING, true);
        this.addModelPrivileges(RamonFBId, FYNDOOCREDITRATING, true);
        this.addModelPrivileges(MichaelFaceBookID, FYNDOOCREDITRATING, true);
        this.addModelPrivileges(GUEST_ROLE, "SCORECARDTESTMODEL", false);
        this.addModelPrivileges(JorisNijboerFaceBookID, "PRESCAN", true);
        this.addModelPrivileges(MichaelFaceBookID, "PRESCAN", true);
        this.addModelPrivileges(BerndFBId, "PRESCAN", true);
        this.addModelPrivileges(BerndFBId, FYNDOOCREDITRATING, true);
        this.addModelPrivileges(MichaelFaceBookID, "SCORECARDTESTMODEL", true);
        this.addModelPrivileges(GUEST_ROLE, "TEST", false);
        this.addModelPrivileges(MichaelFaceBookID, "KSP", true);
        this.addModelPrivileges(MichaelFaceBookID, "REALESTATE", true);
        this.addModelPrivileges(JasperRealEstate, "REALESTATE", true);
        this.addModelPrivileges(RichardRealEstate, "REALESTATE", true);
        this.addModelPrivileges(MichaelFaceBookID, "LGD", true);
        this.addModelPrivileges(LGDFacebookID, "LGD", true);
        this.addModelPrivileges(RuudFacebookID, "LGD", true);
        this.addModelPrivileges(MarcoFacebookID, "LGD", true);
        this.addModelPrivileges(MonliFacebookID, "KSP", true);
        this.addModelPrivileges(MichaelFaceBookID, MVO, true);
        this.addModelPrivileges(BerryFBId, "CLAUDIA2", true);
        this.addModelPrivileges(MichaelFaceBookID, "CLAUDIA2", true);
        this.addModelPrivileges(BasNieveldFBId, "CLAUDIA2", true);
        this.addModelInstancePrivileges(GUEST_ROLE, "DEMO");
    }

    allow(id, resource, role) {
        this.acl.allow(id, resource, role)
        //require('./Auth').rules.push({id: id, resource: resource, role: role})
        if (log.DEBUG) log.debug('allow:' + id + ":[" + resource + ']')
        //console.info(JSON.stringify(require('./Auth')))
    }

    addModelPrivileges(id, modelname, changeExisting) {
        this.allow(id, "/resources/" + modelname + ".js", VIEW_RULE)
        this.allow(id, "/resources/" + modelname + ".story", VIEW_RULE)
        this.allow(id, "/resources/" + modelname + ".story", VIEW_RULE)
        this.allow(id, "/excel/" + modelname, VIEW_RULE)
        this.allow(id, "/resources/" + modelname + ".ffl", VIEW_RULE)
        this.allow(id, "/preview/" + modelname, VIEW_RULE)
        this.allow(id, "/saveJBehaveStory/" + modelname, VIEW_RULE)
        if (changeExisting) this.allow(id, "/saveFFLModel/" + modelname, VIEW_RULE)
        this.allow(id, "/modelChanges/" + modelname, VIEW_RULE)
        this.allow(id, "/scorecard.html", VIEW_RULE)
        this.allow(id, "/resources/lme_docs.pdf", VIEW_RULE)
        this.allow(id, "/readExcel/" + modelname, VIEW_RULE)
        this.allow(id, "/publishDockerImage/" + modelname, VIEW_RULE)
        //allow generic rest-api outputnode  (same name as model_name)
        anonymous['/figure/' + modelname] = true;
    }

    /**
     * Every save on data will create a new hash to resolve the data later in the process.
     * Every hash is added to ACL once created with the server.
     *
     */
    addModelInstancePrivileges(id, instanceId) {
        if (instanceId.endsWith('.ffl')) {
            this.addModelPrivileges(id, instanceId.slice(0, -4))
        } else {
            this.addDataPrivileges(id, instanceId)
        }
    }

    shareData(id, instanceId) {
        anonymous["/data/" + instanceId] = true
    }

    addDataPrivileges(id, instanceId) {
        this.allow(id, "/data/" + instanceId, VIEW_RULE)
        this.allow(id, "/saveUserData/" + instanceId, VIEW_RULE)
        this.allow(id, "/shareData/" + instanceId, VIEW_RULE)
    }

    isAuthorizedToView(id, resource, callback) {
        if (this.isAnonymous(resource)) return callback(null, true);
        //Allow multiple authorization id's
        if (resource.indexOf(',') > -1) {
            const parts = resource.split('/')
            const ids = parts[parts.length - 1].split(',')
            let counter = ids.length;
            for (var i = 0; i < ids.length; i++) {
                function okCallBack(err, authResponse) {
                    if (authResponse) counter--;
                    else callback(null, false)
                    if (counter == 0) {
                        callback(null, true)
                    }
                }

                this.acl.isAllowed(id, '/' + parts[1] + '/' + ids[i], VIEW_RULE, okCallBack)
            }
        } else {
            this.acl.isAllowed(id, resource, VIEW_RULE, callback)
        }
    }

    registerUser(id) {
        this.acl.addUserRoles(id, GUEST_ROLE)
        this.acl.addUserRoles(id, id)
        this.addDataPrivileges(id)
    }

    isAnonymous(resource) {
        /**
         * Tricky exclusion since wildcards are more complex to manage.
         * Add the ^/data-docs/* wildcard as anonymous resource
         */
        if (/^\/data-docs\/.*/.test(resource) || (/^\/model-docs\/.*/.test(resource))) {
            return true;
        }
        return (anonymous[resource]) || false;
    }
}

exports.Authorization = Authorization;