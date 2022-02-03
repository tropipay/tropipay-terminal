/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
const axios = require('axios');
const qs = require('qs');

class DefaultController extends KsMf.app.Controller {

    init() {
        this.logger = this.helper.get('logger').prefix('Security.DefaultController');
    }

    async oauthResponse(req, res) {
        try {
            //... verify the state value
            
        } catch (error) {

        }
    }
}
module.exports = DefaultController;