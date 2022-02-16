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
            res.status(401);
            res.json({
                code: 'unauthorized'
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
        this.logger.prefix('Payment.DefaultController');
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
        this.logger.info("share", "req", req.body);
        const result = await this.tropipay.sharePaylink(data);
        if (!result || result.error) {
            this.logger.error("share", result);
            res.status(401);
            res.json({
                code: 'unauthorized'
            });
        } else {
            this.logger.info("share", result);
            res.json(result);
        }

    }

    async getCountryCode(req, res) {
        this.logger.prefix('Payment.DefaultController');
        const token = req.token;
        this.tropipay.set({
            token
        });
        const result = await this.tropipay.getCountries();
        if (!result || result.error) {
            this.logger.error("country", result);
            res.status(401);
            res.json({
                code: 'unauthorized'
            });
        } else {
            res.json(result);
        }

    }

    async getServiceAmountMin(req, res) {
        const token = req.token;
        this.tropipay.set({
            token
        });
        const service = 'CHARGE_EXTERNAL_CARDS';
        const amountmin = await this.tropipay.getServiceAmountMin(service);
        res.json({
            data: {
                service,
                amountmin
            }
        });
    }

}
module.exports = DefaultController;