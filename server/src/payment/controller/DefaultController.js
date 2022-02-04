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
        this.logger = this.helper.get('logger').prefix('Payment.DefaultController');
        this.tropipay = this.helper.get('TropiPay');
    }

    list(req, res, next) {
        const data = [{
                "id": "0c0d5550-7d0d-11ec-abee-cb5d68bd5d26",
                "credentialId": null,
                "reference": "000000405912",
                "concept": "Order #: 40",
                "description": " ",
                "amount": 3000,
                "currency": "EUR",
                "singleUse": true,
                "reasonId": 4,
                "reasonDes": null,
                "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                "qrImage": null,
                "shortUrl": "https://tppay.me/kysmzr07",
                "state": 1,
                "expirationDays": 0,
                "lang": "es",
                "urlSuccess": "http://modulo.1traveling.com/checkout/40/payment/return/-Ci1Nw1u3QxFRDJnpLr5BWd6nRVPXGCx9Qle4Ic41Aw",
                "urlFailed": "http://modulo.1traveling.com/checkout/40/payment/back/-Ci1Nw1u3QxFRDJnpLr5BWd6nRVPXGCx9Qle4Ic41Aw",
                "urlNotification": "http://modulo.1traveling.com/tropipay_payments/notify",
                "expirationDate": null,
                "serviceDate": null,
                "hasClient": true,
                "paymentUrl": "https://tropipay-dev.herokuapp.com/redsys_payment/eyJwYXJhbXMiOiJleUpFVTE5TlJWSkRTRUZPVkY5QlRVOVZUbFFpT2pNd01EQXNJa1JUWDAxRlVrTklRVTVVWDA5U1JFVlNJam9pTmpRd05qSTNNamMyTkRnMklpd2lSRk5mVFVWU1EwaEJUbFJmVFVWU1EwaEJUbFJEVDBSRklqb2lNVEkwTkRNNU56RXlJaXdpUkZOZlRVVlNRMGhCVGxSZlExVlNVa1ZPUTFraU9pSTVOemdpTENKRVUxOU5SVkpEU0VGT1ZGOVVVa0ZPVTBGRFZFbFBUbFJaVUVVaU9qQXNJa1JUWDAxRlVrTklRVTVVWDFSRlVrMUpUa0ZNSWpvaU1TSXNJa1JUWDAxRlVrTklRVTVVWDBSRFF5STZJazRpTENKRVUxOU5SVkpEU0VGT1ZGOU5SVkpEU0VGT1ZGVlNUQ0k2SW1oMGRIQnpPaTh2ZEhKdmNHbHdZWGt0WkdWMkxtaGxjbTlyZFdGd2NDNWpiMjB2WVhCcEwyTmhiR3hpWVdOckwzSmxaSE41Y3lJc0lrUlRYMDFGVWtOSVFVNVVYMVZTVEU5TElqb2lhSFIwY0RvdkwyMXZaSFZzYnk0eGRISmhkbVZzYVc1bkxtTnZiUzlqYUdWamEyOTFkQzgwTUM5d1lYbHRaVzUwTDNKbGRIVnliaTh0UTJreFRuY3hkVE5SZUVaU1JFcHVjRXh5TlVKWFpEWnVVbFpRV0VkRGVEbFJiR1UwU1dNME1VRjNJaXdpUkZOZlRVVlNRMGhCVGxSZlZWSk1TMDhpT2lKb2RIUndPaTh2Ylc5a2RXeHZMakYwY21GMlpXeHBibWN1WTI5dEwyTm9aV05yYjNWMEx6UXdMM0JoZVcxbGJuUXZZbUZqYXk4dFEya3hUbmN4ZFROUmVFWlNSRXB1Y0V4eU5VSlhaRFp1VWxaUVdFZERlRGxSYkdVMFNXTTBNVUYzSWl3aVJGTmZUVVZTUTBoQlRsUmZRMDlPVTFWTlJWSk1RVTVIVlVGSFJTSTZJakVpZlE9PSIsInNpZ25hdHVyZSI6ImpJK3pnT3FMNXRZZkxyNGoyeklsRUtTcWFDd1gvYm9CejdWSVRLUlE2aEU9IiwicmVkc3lzVXJsIjoiaHR0cHM6Ly9zaXMtdC5yZWRzeXMuZXM6MjU0NDMvc2lzL3JlYWxpemFyUGFnbyJ9",
                "favorite": false,
                "createdAt": "2022-01-24T11:59:13.190Z",
                "updatedAt": "2022-01-24T11:59:13.943Z"
            },
            {
                "id": "51101210-7d0c-11ec-abee-cb5d68bd5d26",
                "credentialId": null,
                "reference": "000000395358",
                "concept": "Order #: 39",
                "description": " ",
                "amount": 6000,
                "currency": "EUR",
                "singleUse": true,
                "reasonId": 4,
                "reasonDes": null,
                "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                "qrImage": null,
                "shortUrl": "https://tppay.me/kysmt0v2",
                "state": 1,
                "expirationDays": 0,
                "lang": "es",
                "urlSuccess": "http://modulo.1traveling.com/checkout/39/payment/return/MW2idmrr9JES3UayUHPh-4VHKZjGrgDSO45jvY461Jw",
                "urlFailed": "http://modulo.1traveling.com/checkout/39/payment/back/MW2idmrr9JES3UayUHPh-4VHKZjGrgDSO45jvY461Jw",
                "urlNotification": "http://modulo.1traveling.com/tropipay_payments/notify",
                "expirationDate": null,
                "serviceDate": null,
                "hasClient": true,
                "paymentUrl": "https://tropipay-dev.herokuapp.com/redsys_payment/eyJwYXJhbXMiOiJleUpFVTE5TlJWSkRTRUZPVkY5QlRVOVZUbFFpT2pZd01EQXNJa1JUWDAxRlVrTklRVTVVWDA5U1JFVlNJam9pTlRFMk9UVXlNamc1TWprM0lpd2lSRk5mVFVWU1EwaEJUbFJmVFVWU1EwaEJUbFJEVDBSRklqb2lNVEkwTkRNNU56RXlJaXdpUkZOZlRVVlNRMGhCVGxSZlExVlNVa1ZPUTFraU9pSTVOemdpTENKRVUxOU5SVkpEU0VGT1ZGOVVVa0ZPVTBGRFZFbFBUbFJaVUVVaU9qQXNJa1JUWDAxRlVrTklRVTVVWDFSRlVrMUpUa0ZNSWpvaU1TSXNJa1JUWDAxRlVrTklRVTVVWDBSRFF5STZJazRpTENKRVUxOU5SVkpEU0VGT1ZGOU5SVkpEU0VGT1ZGVlNUQ0k2SW1oMGRIQnpPaTh2ZEhKdmNHbHdZWGt0WkdWMkxtaGxjbTlyZFdGd2NDNWpiMjB2WVhCcEwyTmhiR3hpWVdOckwzSmxaSE41Y3lJc0lrUlRYMDFGVWtOSVFVNVVYMVZTVEU5TElqb2lhSFIwY0RvdkwyMXZaSFZzYnk0eGRISmhkbVZzYVc1bkxtTnZiUzlqYUdWamEyOTFkQzh6T1M5d1lYbHRaVzUwTDNKbGRIVnliaTlOVnpKcFpHMXljamxLUlZNelZXRjVWVWhRYUMwMFZraExXbXBIY21kRVUwODBOV3AyV1RRMk1VcDNJaXdpUkZOZlRVVlNRMGhCVGxSZlZWSk1TMDhpT2lKb2RIUndPaTh2Ylc5a2RXeHZMakYwY21GMlpXeHBibWN1WTI5dEwyTm9aV05yYjNWMEx6TTVMM0JoZVcxbGJuUXZZbUZqYXk5TlZ6SnBaRzF5Y2psS1JWTXpWV0Y1VlVoUWFDMDBWa2hMV21wSGNtZEVVMDgwTldwMldUUTJNVXAzSWl3aVJGTmZUVVZTUTBoQlRsUmZRMDlPVTFWTlJWSk1RVTVIVlVGSFJTSTZJakVpZlE9PSIsInNpZ25hdHVyZSI6IkVsM0U3dFYySW54bXpmOG15UVlzM0tmYXc5TlptQ2o5ZzlqZStHTDFjUTg9IiwicmVkc3lzVXJsIjoiaHR0cHM6Ly9zaXMtdC5yZWRzeXMuZXM6MjU0NDMvc2lzL3JlYWxpemFyUGFnbyJ9",
                "favorite": false,
                "createdAt": "2022-01-24T11:53:59.474Z",
                "updatedAt": "2022-01-24T11:54:00.112Z"
            }
        ]
        res.json(data);
    }

    async insert(req, res) {
        const data = {
            "reference": req.body.reference,
            "concept": req.body.concept,
            "description": req.body.description,
            "amount": parseFloat(req.body.amount),
            "lang": req.body.lang,

            "currency": "EUR", // req.body.currency [number cambair a slug]
            "reasonId": 4,

            "directPayment": false,
            "favorite": false,
            "singleUse": false,
            "urlSuccess": "",
            "urlFailed": "",
            "urlNotification": "",
            "expirationDays": 1,
            "serviceDate": "2021-08-20"
        };
        const result = await this.tropipay.set({
            token: req.token
        }).setPaylink(data);
        if (result.error) {
            res.status(401).json({
                error: result.error.message
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

}
module.exports = DefaultController;