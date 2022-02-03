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
        this.logger = this.helper.get('logger').prefix('Movement.DefaultController');
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

    insert(req, res, next) {
        const data = {
            "id": "7e3723b0-8530-11ec-b49f-7359de707e2d",
            "reference": "my-reference",
            "concept": "Bicycle",
            "description": "Two wheels",
            "amount": 100000,
            "currency": "EUR",
            "singleUse": true,
            "favorite": true,
            "reasonId": 4,
            "reasonDes": null,
            "expirationDays": 0,
            "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
            "lang": "es",
            "state": 1,
            "urlSuccess": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "urlFailed": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "urlNotification": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "expirationDate": null,
            "serviceDate": null,
            "hasClient": true,
            "credentialId": 5,
            "updatedAt": "2022-02-03T20:33:06.965Z",
            "createdAt": "2022-02-03T20:33:06.412Z",
            "qrImage": "data:image/png;base64,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",
            "shortUrl": "https://tppay.me/kz7fr4mj",
            "paymentUrl": "https://tropipay-dev.herokuapp.com/redsys_payment/eyJwYXJhbXMiOiJleUpFVTE5TlJWSkRTRUZPVkY5QlRVOVZUbFFpT2pFd01EQXdNQ3dpUkZOZlRVVlNRMGhCVGxSZlQxSkVSVklpT2lJMU1qYzFNVE16TlRReU1UQWlMQ0pFVTE5TlJWSkRTRUZPVkY5TlJWSkRTRUZPVkVOUFJFVWlPaUl4TWpRME16azNNVElpTENKRVUxOU5SVkpEU0VGT1ZGOURWVkpTUlU1RFdTSTZJamszT0NJc0lrUlRYMDFGVWtOSVFVNVVYMVJTUVU1VFFVTlVTVTlPVkZsUVJTSTZNQ3dpUkZOZlRVVlNRMGhCVGxSZlZFVlNUVWxPUVV3aU9pSXhJaXdpUkZOZlRVVlNRMGhCVGxSZlJFTkRJam9pVGlJc0lrUlRYMDFGVWtOSVFVNVVYMDFGVWtOSVFVNVVWVkpNSWpvaWFIUjBjSE02THk5MGNtOXdhWEJoZVMxa1pYWXVhR1Z5YjJ0MVlYQndMbU52YlM5aGNHa3ZZMkZzYkdKaFkyc3ZjbVZrYzNseklpd2lSRk5mVFVWU1EwaEJUbFJmVlZKTVQwc2lPaUpvZEhSd2N6b3ZMM2RsWW1odmIyc3VjMmwwWlM4Mk9EQTRNalpoTlMweE9UbGxMVFEwTlRVdFltRmlZeTFtTkRkaU4yWXlObVZsTjJVaUxDSkVVMTlOUlZKRFNFRk9WRjlWVWt4TFR5STZJbWgwZEhCek9pOHZkMlZpYUc5dmF5NXphWFJsTHpZNE1EZ3lObUUxTFRFNU9XVXRORFExTlMxaVlXSmpMV1kwTjJJM1pqSTJaV1UzWlNJc0lrUlRYMDFGVWtOSVFVNVVYME5QVGxOVlRVVlNURUZPUjFWQlIwVWlPaUl4SW4wPSIsInNpZ25hdHVyZSI6IjBlck8rSkRQNDhoU3dwRmR2eFhwVzU0dm9CU3lyZWhQc2M3VXJYMFJBSlk9IiwicmVkc3lzVXJsIjoiaHR0cHM6Ly9zaXMtdC5yZWRzeXMuZXM6MjU0NDMvc2lzL3JlYWxpemFyUGFnbyJ9"
        };
        res.json(data);
    }

}
module.exports = DefaultController;