/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class SecurityModule extends KsMf.app.Module {

    initConfig() {
        const prefix = "/api/v1" + this.prefix;
        
        this.routes = [{
            route: prefix + "/oauth/response",
            controller: 'DefaultController',
            action: 'oauthResponse',
            method: 'get'
        }, {
            route: prefix + "/user/connected_view",
            controller: 'DefaultController',
            action: 'oauthConnect',
            method: 'get'
        }, {
            route: prefix + "/profile",
            controller: 'DefaultController',
            action: 'getProfile',
            method: 'get'
        }];
    }

}
module.exports = SecurityModule;