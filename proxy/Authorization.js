/**
 * TODO: All user-entered data is in this stage cross-user-accessible,
 *  - the response header should contain newly created hashes when saving
 *  - the request header should contain Authorization-module independent authorization header e.g. X-Authorization-header: hash1,hash2,hash3 for URL get: data/hash1,hash2
 */
const Acl = require('acl');

const MichaelFaceBookID = '1683958891676092';
const VIEW_RULE = 'view';
const GUEST_ROLE = 'guest';

class Authorization {
    constructor() {
        this.acl = new Acl(new Acl.memoryBackend());
        this.acl.addUserRoles(MichaelFaceBookID, MichaelFaceBookID)
        const anonymous_resources = [

        ]
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
            "/font-awesome/fonts/fontawesome-webfont.ttf",
            "/font-awesome/fonts/fontawesome-webfont.woff",
            "/font-awesome/fonts/fontawesome-webfont.woff2",
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
        this.model_resources = [
            "/resources/MVO.js",
            "/resources/MVO.story",
            "/excel/MVO",
            "/resources/MVO.ffl"
        ]
        const resources = [
            //IDE-FFL model Instance
            "/data/DEMO",              //TODO: DEMO is a various hash of figure-state.
            "/resources/MVO.js",
            "/resources/MVO.story",
            "/excel/MVO",
            "/resources/MVO.ffl",

            "/branches",  //IDE
            "/models",    //IDE
            "/hasUpdates" //IDE
        ]
        for (var i = 0; i < resources.length; i++) {
            this.acl.allow(MichaelFaceBookID, resources[i], VIEW_RULE)
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
        return this.acl.isAllowed(id, resource.split('?')[0], VIEW_RULE, callback)
    }

    isAuthorized(id, resource, role, callback) {
        return this.acl.isAllowed(id, resource.split('?')[0], role, callback)
    }

    isAnonymous(resource) {
        return true
    }
}

//acl.allow("1747137275360424", 'KSP', 'view')
//acl.allow("1683958891676092", 'KSP', 'view')
exports.Authorization = Authorization;