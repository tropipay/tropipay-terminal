/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

const TokenRequire = require('../security/middleware/TokenRequire');
class PaymentModule extends KsMf.app.Module {

    initConfig() {
        const prefix = "/api/v1" + this.prefix;
        this.routes = [{
            route: prefix + "/",
            controller: 'DefaultController',
            action: 'list',
            method: 'get',
            middleware: {
                global: [TokenRequire]
            }

        }];
    }

}
module.exports = PaymentModule;