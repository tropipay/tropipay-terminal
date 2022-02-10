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
    /**
     * http://localhost:3005/api/v1/movement
     */
    init() {
        this.logger = this.helper.get('logger');
        this.tropipay = this.helper.get('TropiPay');
    }

    async list(req, res) {
        this.logger.prefix('Movement.DefaultController').info('params', req.query);
        const {offset, limit, criteria} = req.query;
        const result = await this.tropipay.set({
            token: req.token
        }).getMovements(offset || 0, limit || 10, criteria || '');
        if (result.error) {
            res.status(401).json({
                error: result.error.message
            });
        } else {
            res.json(result.data);
        }
    }
}
module.exports = DefaultController;