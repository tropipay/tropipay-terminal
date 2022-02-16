/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class PaymentModule extends KsMf.app.Module {

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
        }, {
            route: prefix + "/reasons",
            controller: 'DefaultController',
            action: 'getReasons',
            method: 'get'
        }, {
            route: prefix + "/fee",
            controller: 'DefaultController',
            action: 'getFee',
            method: 'get'
        }, {
            route: prefix + "/info",
            controller: 'DefaultController',
            action: 'getInfo',
            method: 'post'
        }, {
            route: prefix + "/share",
            controller: 'DefaultController',
            action: 'share',
            method: 'post'
        }, {
            route: prefix + "/countrycode",
            controller: 'DefaultController',
            action: 'getCountryCode',
            method: 'get'
        }, {
            route: prefix + "/amountmin",
            controller: 'DefaultController',
            action: 'getServiceAmountMin',
            method: 'get'
        }];
    }

}
module.exports = PaymentModule;