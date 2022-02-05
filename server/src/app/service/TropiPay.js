const axios = require('axios');

class TropiPay {

    constructor() {
        this.token = '';
        this.base = process.env.URL_TROPIPAY;
    }

    set(data) {
        this.token = data && data.token ? data.token : this.token;
        return this;
    }

    /**
     * 
     * @param {OBJECT} options 
     * @param {OBJECT} options.headers
     * @param {STRING} options.url 
     * @param {STRING} options.method 
     * @param {OBJECT} options.data 
     */
    async req(options) {
        options = options || {};
        const headers = Object.assign({
            'Authorization': this.token
        }, options.headers || {});
        const opt = {
            headers,
            url: this.base + options.url,
            method: options.method || 'post',
            data: options.data || {}
        }
        try {
            const result = await axios(opt);
            return {
                data: result.data
            };
        } catch (error) {
            return {
                error: error.message || error
            }
        }
    }

    /**
     * 
     * @param {OBJECT} payload 
     * @param {STRING} payload.client_id 
     * @param {STRING} payload.client_secret 
     * @param {STRING} payload.redirect_uri 
     * @param {STRING} payload.code_verifier
     * @param {STRING} payload.scope 
     * @param {STRING} payload.code 
     */
    async getAuthorization(payload) {
         //... confifure options for get authorization code
        const data = {
            grant_type: "authorization_code",
            ...payload
        };
        return await this.req({
            url: "/api/v2/access/authorize",
            method: 'post',
            data
        });
    }
    /**
     * 
     * @returns {OBJECT} {
            "name": "Antonio ",
            "surname": "Membrides Espinosa",
            "id": "e2931920-e402-11ea-a30d-83c978a74aaa",
            "company": null,
            "email": "tony@gmail.com",
            "phone": "+5300000000",
            "address": "reparto Griffo, edificio 245, apto 0535",
            "walletId": "6878",
            "t_c_version": "/terms/v0.0",
            "role": "user",
            "nationality": null,
            "state": 1,
            "balance": 224187,
            "countryDestinationId": 0,
            "kycLevel": 4,
            "occupationId": 31,
            "clientTypeId": 1,
            "isPublicOffice": false,
            "birthCountryId": 0,
            "province": "Cienfuegos",
            "groupId": 1,
            "lastLogin": "2022-02-03T23:26:26.138Z",
            "pendingIn": 82513,
            "pendingOut": 0,
            "lang": "es",
            "shortId": "00Y2",
            "documentTypeId": 5,
            "documentExpirationDate": "2026-09-16T00:00:00.000Z",
            "contracts": null,
            "liveProof": true,
            "needMigration": false,
            "twoFaType": 1,
            "twoFaMode": 1,
            "otherOccupationDetail": "Ingeniero de software ",
            "merchantId": 1,
            "errorPaymentEntityId": null,
            "errorWalletId": null,
            "verified": true,
            "notes": null,
            "sex": null,
            "documentCountryId": null,
            "businessId": null,
            "businessUserType": null,
            "businessPercent": null,
            "affiliateEarnings": 0,
            "affiliateSync": null,
            "createdAt": "2020-08-21T23:06:03.059Z",
            "updatedAt": "2022-02-03T23:26:26.139Z",
            "group": {
                "id": 1,
                "name": "KYC3_FULL_ALLOW",
                "createdAt": "2019-10-29T12:19:30.340Z",
                "updatedAt": "2020-06-04T14:09:10.754Z",
                "permissions": [
                    {
                        "id": 1,
                        "name": "ALLOW_EXTERNAL_CHARGE",
                        "label": "payments",
                        "type": 2,
                        "createdAt": "2019-10-29T12:19:50.939Z",
                        "updatedAt": "2021-11-05T20:47:59.661Z",
                        "GroupPermission": {
                            "groupId": 1,
                            "permissionId": 1,
                            "createdAt": "2019-10-29T12:20:04.555Z",
                            "updatedAt": "2019-10-29T12:20:04.555Z"
                        }
                    }
                ]
            },
            "business": null,
            "operation": true,
            "preauthorized": false
        }
     */
    async getProfile() {
        return await this.req({
            url: "/api/users/profile",
            method: 'get'
        });
    }

    /**
     * @description get reson list 
     * @return {ARRAY} {
            "id": 1,
            "name": "Arreglo de vivienda",
            "description": null,
            "active": true,
            "createdAt": "2021-01-21T03:50:17.227Z",
            "updatedAt": "2021-01-21T03:50:17.227Z"
        }
     */
    async getReasons() {
        return await this.req({
            url: "/api/reasons",
            method: 'get'
        });
    }

    /**
     * @description get fee
     * @return {OBJECT} {
            "usd2eur": 0.8738967054094205
        }
     */
    async getFee() {
        return await this.req({
            url: "/api/booking/fee",
            method: 'get'
        });
    }

    /**
     * @description create a payment card
     * @param {OBJECT} data {
            "reference": "my-reference",
            "concept": "Bicycle",
            "favorite": true,
            "description": "Two wheels",
            "amount": 100000,
            "currency": "EUR",
            "singleUse": true,
            "reasonId": 4,
            "expirationDays": 1,
            "lang": "es",
            "urlSuccess": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "urlFailed": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "urlNotification": "https://webhook.site/680826a5-199e-4455-babc-f47b7f26ee7e",
            "serviceDate": "2021-08-20",
            "directPayment": true
        }
     * @return {OBJECT} {
            "id": "9dd3ca70-8530-11ec-b49f-7359de707e2d",
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
            "hasClient": false,
            "credentialId": 5,
            "updatedAt": "2022-02-03T20:33:59.826Z",
            "createdAt": "2022-02-03T20:33:59.448Z",
            "qrImage": "data:image/png;base64,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",
            "shortUrl": "https://tppay.me/kz7fs9f1",
            "paymentUrl": null
        }
     */
    async setPaylink(data) {
        return await this.req({
            url: "/api/v2/paymentcards",
            method: 'post',
            data
        });
    }

    /**
     * @description get service by slug
     * @param {STRING} slug 
     * @return {OBJECT} {
            "id": 2,
            "name": "Charge External Client cards",
            "slug": "CHARGE_EXTERNAL_CARDS",
            "service_fee_percent": 45,
            "service_fee_fixed": 0,
            "tp_fee_percent": 300,
            "tp_fee_fixed": 50,
            "type": "PAYMENT",
            "order": 2,
            "min": 1600,
            "max": null,
            "createdAt": "2019-10-29T12:12:07.133Z",
            "updatedAt": "2021-09-28T08:26:48.174Z"
     * }
     */
    async getService(slug = 'CHARGE_EXTERNAL_CARDS'){
        return await this.req({
            url: "/api/services/get/" + slug,
            method: 'get'
        });
    }

    /**
     * @description get service list
     * @return {ARRAY} Service
     */
    async getServices(){
        return await this.req({
            url: "/api/services",
            method: 'get'
        });
    }
}

module.exports = TropiPay;