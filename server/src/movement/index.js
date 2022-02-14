/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class MovementModule extends KsMf.app.Module {

    initConfig() {
        const prefix = "/api/v1" + this.prefix;
        const TokenRequire = this.helper.get('middleware.token');
        if(TokenRequire) {
            this.middleware.global.push(TokenRequire);
        }
        this.routes = [{
            route: prefix + "/",
            controller: 'DefaultController',
            method: 'rest'
        }];
    }

}
module.exports = MovementModule;