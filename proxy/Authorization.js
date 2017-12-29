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
 */
const Acl = require('acl');

const MichaelFaceBookID = '1683958891676092';
const VIEW_RULE = 'view';
const GUEST_ROLE = 'guest';
const anonymous = {}

class Authorization {
    constructor() {
        this.acl = new Acl(new Acl.memoryBackend());
        this.acl.addUserRoles(MichaelFaceBookID, MichaelFaceBookID)

        //These resources do not require authorization or authentication
        const anonymous_resources = [
            '/data-docs',
            '/data-docs/',
            '/figure/KinderSpaarPlan',
            '/data-api-docs',
            "/Promotion.html",
            "/monli.css",
            "/logo-monli.svg",
            "/promotion.js",
            "/bundle.css",
            "/wat_kost_een_studie_header.jpg",
            "/monli.css",
            "/monli.ico",
            "/monli.js",
            "/bootstrap.min.js",
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

            "/aceide.html",
            "/grid_example.css",
            "/scorecard.html",
            "/ext-searchbox.js",
            "/dist/css/AdminLTE.min.css",
            "/aceide.css",
            "/bundle.css",
            "/dist/css/skins/_all-skins.min.css",
            "/dist/img/user2-160x160.jpg",
            "/favicon.ico",
            "/aceide.js",
            "/engineonly.js",
            "/scorecard.js",
            "/bootstrap.min.js",
            "/dist/js/adminlte.min.js",
            "/dist/js/demo.js",
            "/ext-language_tools.js",
            "/ace.js",
            "/javascripts/fflmode.js",
            "/theme-tomorrow.js",
        ]
        for (var i = 0; i < guest_resources.length; i++) {
            this.acl.allow(GUEST_ROLE, guest_resources[i], VIEW_RULE)
        }
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
        const secure_resources = [
            //IDE-FFL model Instance
            "/HoeveelKostEenStudie.html",
            "/data/DEMO",              //TODO: DEMO is a various hash of figure-state.
            "/resources/MVO.js",
            "/resources/MVO.story",
            "/excel/MVO",
            "/resources/MVO.ffl",

            "/branches",  //IDE
            "/models",    //IDE
            "/hasUpdates" //IDE
        ]
        for (var i = 0; i < secure_resources.length; i++) {
            this.acl.allow(MichaelFaceBookID, secure_resources[i], VIEW_RULE)
        }
        this.addModelPrivileges(GUEST_ROLE, "SCORECARDTESTMODEL");
        this.addModelInstancePrivileges(GUEST_ROLE, "DEMO");
    }

    addModelPrivileges(id, modelname) {
        this.acl.allow(id, "/resources/" + modelname + ".js", VIEW_RULE)
        this.acl.allow(id, "/resources/" + modelname + ".story", VIEW_RULE)
        this.acl.allow(id, "/excel/" + modelname, VIEW_RULE)
        this.acl.allow(id, "/resources/" + modelname + ".ffl", VIEW_RULE)
        this.acl.allow(id, "/preview/" + modelname, VIEW_RULE)
        this.acl.allow(id, "/saveFFLModel/" + modelname, VIEW_RULE)
        this.acl.allow(id, "/scorecard.html", VIEW_RULE)
    }

    /**
     * Every save on data will create a new hash to resolve the data later in the process.
     * Every hash is added to ACL once created with the server.
     *
     */
    addModelInstancePrivileges(id, instanceId) {
        this.acl.allow(id, "/data/" + instanceId, VIEW_RULE)
        this.acl.allow(id, "/saveUserData/" + instanceId, VIEW_RULE)
    }

    isAuthorizedToView(id, resource, callback) {
        //TODO: for now just always add guest-role to any call, should only be added if not exists
        this.acl.addUserRoles(id, 'guest')
        if (this.isAnonymous(resource)) return callback(null, true);
        return this.acl.isAllowed(id, resource.split('?')[0], VIEW_RULE, callback)
    }

    isAuthorized(id, resource, role, callback) {
        return this.acl.isAllowed(id, resource.split('?')[0], role, callback)
    }

    isAnonymous(resource) {
        const real_resource = resource.split('?')[0];
        /**
         * Add the data-docs wildcard as anonymous resource
         */
        if (/\/data-docs\/.*/.test(real_resource)) {
            return true;
        }
        return (anonymous[real_resource]) || false;
    }
}

exports.Authorization = Authorization;