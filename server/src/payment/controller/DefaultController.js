/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DefaultController extends KsMf.app.Controller {
    /**
     * http://localhost:3005/api/v1/payment
     */
    init() {
        this.logger = this.helper.get('logger');
        this.tropipay = this.helper.get('TropiPay');
    }

    async list(req, res) {
        const result = await this.tropipay.set({
            token: req.token
        }).getPaylink();
        if (result.error) {
            res.status(401).json({
                error: result.error.message
            });
        } else {
            res.json(result.data);
        }
    }

    async insert(req, res) {
        const data = {
            "reference": req.body.reference,
            "concept": req.body.concept,
            "description": req.body.description,
            "amount": parseFloat(req.body.amount) * 100,
            "lang": req.body.lang,
            "reasonId": parseInt(req.body.reason || req.body.reasonId || 1),
            "currency": "EUR", // req.body.currency [number cambair a slug]
            "directPayment": false,
            "favorite": false,
            "singleUse": false,
            "expirationDays": 1,
            "serviceDate": "2021-08-20",
            "urlSuccess": "",
            "urlFailed": "",
            "urlNotification": ""
        };

        const result = await this.tropipay.set({
            token: req.token
        }).setPaylink(data);
        if (result.error) {
            res.status(401);
            return res.json({
                error: {
                    code: "Unauthorized",
                    message: result.error
                },
            });
        } else {
            res.json(result.data);
        }
    }

    async getFee(req, res) {
        const token = req.token;
        const result = await this.tropipay.set({
            token
        }).getFee();
        if (result.error) {
            res.json(result.error.message);
        } else {
            res.json(result.data);
        }
    }

    async getReasons(req, res) {
        const token = req.token;
        const result = await this.tropipay.set({
            token
        }).getReasons();
        if (result.error) {
            res.json(result.error.message);
        } else {
            res.json(result.data);
        }
    }

    async getInfo(req, res) {
        const token = req.token;
        this.tropipay.set({
            token
        });
        const fee = await this.tropipay.getFee();
        const srv = await this.tropipay.getService('CHARGE_EXTERNAL_CARDS');
        if (fee.error || srv.error) {
            this.logger.prefix('Payment.DefaultController');
            this.logger.error("fee", fee.error);
            this.logger.error("srv", srv.error);
            res.status(500);
            res.json({
                code: 'connection'
            });
        } else {
            const result = {
                rate: fee.data['usd2eur'],
                service: {
                    "service_fee_percent": srv.data["service_fee_percent"],
                    "service_fee_fixed": srv.data["service_fee_fixed"],
                    "tp_fee_percent": srv.data["tp_fee_percent"],
                    "tp_fee_fixed": srv.data["tp_fee_fixed"]
                }
            }
            res.json(result);
        }
    }

    async share(req, res) {
        const token = req.token;
        this.tropipay.set({
            token
        });
        const data = {
            cardPaymentId: req.body.cardPaymentId,
            sendEmail: req.body.sendEmail,
            notifyEmail: req.body.notifyEmail,
            sendSMS: req.body.sendSMS,
            phone: req.body.phone
        };
        const result = await this.tropipay.sharePaylink(data);
        this.logger.prefix('Payment.DefaultController');
        if (!result || result.error) {
            this.logger.error(result);
            res.status(500);
            res.json({
                code: 'connection'
            });
        } else {
            this.logger.info(result);
            res.json(result);
        }

    }

}
module.exports = DefaultController;