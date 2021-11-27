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
            if (req.query['state'] !== state) {
                this.logger.error('NOT secure, the state value not match');
            }
            //... confifure options for get authorization code
            const param = {
                grant_type: "authorization_code",
                code: req.query['code'],
                client_id,
                client_secret,
                redirect_uri,
                code_verifier,
                scope
            };
            //... save authorization code 
            const token = await axios.post(oauth_token, param);
            const old = req.cookies.session ? (typeof (req.cookies.session) === 'string' ? JSON.parse(req.cookies.session) : req.cookies.session) : {};
            const ses = {
                ...old,
                ...token.data
            };
            res.cookie('session', JSON.stringify(ses), {
                maxAge: 86400000
            });

            this.logger.info('session', ses);
            const from = '/auth/session';
            res.redirect(url_terminal + from);
        } catch (error) {
            this.logger.error("Error", error);
            res.end('OAUTH: Not authorize');
        }
    }

    async oauthConnect(req, res) {
        const param = qs.stringify({
            response_type: "code",
            client_id,
            client_secret,
            redirect_uri,
            code_challenge,
            code_challenge_method,
            state,
            scope
        });
        this.logger.info('connected_view', param);
        res.redirect(oauth_authorize + "?" + param);
    }

    async getProfile(req, res) {
        const session = req.body;

        const profileData = await axios({
            headers: {
                'Authorization': 'Bearer ' + session.access_token
            },
            url: url_tropipay + "/api/users/profile"
        });

        res.json(profileData.data);
    }

}
module.exports = DefaultController;