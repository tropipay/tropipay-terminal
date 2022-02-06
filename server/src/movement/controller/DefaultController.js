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
        this.tropipay = this.helper.get('TropiPay');
    }

    async list(req, res) {
        console.log('params', req.query);
        res.json({
            "count": 33,
            "rows": [
                {
                    "id": 376053,
                    "reference": "000000772127",
                    "bankOrderCode": "637935404157",
                    "provider": 4,
                    "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                    "bookingDate": "2022-01-20T23:21:27.906Z",
                    "days": null,
                    "amount": 3700,
                    "originalAmountInEur": 3700,
                    "currency": "EUR",
                    "originalCurrencyAmount": "3700",
                    "destinationAmount": "3522",
                    "destinationCurrency": "EUR",
                    "conversionRate": 1,
                    "originalRate": 1,
                    "providerFee": 45,
                    "ourFee": 300,
                    "realBankFee": null,
                    "depositaccountId": null,
                    "payProviderFee": false,
                    "state": 5,
                    "serviceId": 2,
                    "paymentcardId": "b1533610-7a47-11ec-b779-4b774651889c",
                    "expirationDate": "2022-01-20T11:27:00.000Z",
                    "movementTypeId": 2,
                    "balanceBefore": null,
                    "balanceAfter": null,
                    "transactionId": 154465,
                    "credentialId": 5,
                    "isInternal": false,
                    "isPreauth": false,
                    "agent": "TROPIPAY",
                    "ip": "5.39.93.111",
                    "reasonId": null,
                    "reasonDes": null,
                    "deliveryCode": null,
                    "paymentEntityStatus": 1,
                    "paymentEntityBalance": null,
                    "errorReason": null,
                    "notificationUrl": null,
                    "riskFlag": 0,
                    "riskScore": 0,
                    "campaignId": null,
                    "fiat": true,
                    "createdAt": "2022-01-20T23:21:27.906Z",
                    "updatedAt": "2022-01-20T23:22:08.724Z",
                    "depositaccount": null,
                    "destinationTransfer": null,
                    "service": {
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
                    },
                    "charges": [
                        {
                            "clientName": "Daniel",
                            "clientLastName": "Calderón",
                            "clientAddress": "kalea, Pamplona, 31621",
                            "clientPhone": "699045432",
                            "clientEmail": "dani@danielcalderon.com",
                            "id": 249006,
                            "orderCode": "1642720887798",
                            "cardPan": "0000",
                            "cardBin": null,
                            "cardExpirationDate": "2020-01-01T00:00:00.000Z",
                            "cardHolderName": "Daniel",
                            "cardToken": "",
                            "amount": 3700,
                            "currency": 978,
                            "chargeProviderFee": false,
                            "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                            "bookingId": 376053,
                            "errorReason": "",
                            "state": 3,
                            "serviceId": 2,
                            "cardCountry": "ES",
                            "cardBrand": "VISA",
                            "cardCategory": "",
                            "cardType": null,
                            "cardSubBrand": null,
                            "card3DSVersion": null,
                            "cardAut3DSecure2Method": null,
                            "card3DS2IdMsg": null,
                            "card3DS2Partition": null,
                            "cardDcc": null,
                            "tpvUserAgent": null,
                            "tpvDeviceFingerPrint": null,
                            "tpvAlertIndicator": null,
                            "tpvCardCountrySameIPCountry": null,
                            "bicCode": "",
                            "amountInEuro": 3700,
                            "tpvAuthCode": "036571",
                            "tpvAccountCode": "",
                            "tpvID": "124439712-001",
                            "tpvConcept": "",
                            "tpvUserId": "",
                            "tpvUserToken": "",
                            "tpvScoring": 0,
                            "tpvTransactionType": 0,
                            "tpvSecurePayment": 1,
                            "securePayment": null,
                            "tpvNotificationHash": null,
                            "clientIp": "127.0.0.1",
                            "clientTC": "true",
                            "clientCountryId": 1,
                            "riskScore": 0,
                            "createdAt": "2022-01-20T23:21:27.914Z",
                            "updatedAt": "2022-01-20T23:21:58.350Z"
                        }
                    ],
                    "purchases": [],
                    "consumedVoucher": null
                },
                {
                    "id": 376052,
                    "reference": "000000762625",
                    "bankOrderCode": "305319001934",
                    "provider": 4,
                    "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                    "bookingDate": "2022-01-20T22:26:26.178Z",
                    "days": null,
                    "amount": 4500,
                    "originalAmountInEur": 4500,
                    "currency": "EUR",
                    "originalCurrencyAmount": "4500",
                    "destinationAmount": "4295",
                    "destinationCurrency": "EUR",
                    "conversionRate": 1,
                    "originalRate": 1,
                    "providerFee": 45,
                    "ourFee": 300,
                    "realBankFee": null,
                    "depositaccountId": null,
                    "payProviderFee": false,
                    "state": 5,
                    "serviceId": 2,
                    "paymentcardId": "01562080-7a40-11ec-b779-4b774651889c",
                    "expirationDate": "2022-01-20T10:26:00.000Z",
                    "movementTypeId": 2,
                    "balanceBefore": null,
                    "balanceAfter": null,
                    "transactionId": 154464,
                    "credentialId": 5,
                    "isInternal": false,
                    "isPreauth": false,
                    "agent": "TROPIPAY",
                    "ip": "5.39.93.111",
                    "reasonId": null,
                    "reasonDes": null,
                    "deliveryCode": null,
                    "paymentEntityStatus": 1,
                    "paymentEntityBalance": null,
                    "errorReason": null,
                    "notificationUrl": null,
                    "riskFlag": 0,
                    "riskScore": 0,
                    "campaignId": null,
                    "fiat": true,
                    "createdAt": "2022-01-20T22:26:26.179Z",
                    "updatedAt": "2022-01-20T22:27:33.004Z",
                    "depositaccount": null,
                    "destinationTransfer": null,
                    "service": {
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
                    },
                    "charges": [
                        {
                            "clientName": "Daniel",
                            "clientLastName": "Calderón",
                            "clientAddress": "kalea, Pamplona, 31621",
                            "clientPhone": "699045432",
                            "clientEmail": "dani@danielcalderon.com",
                            "id": 249005,
                            "orderCode": "1642717586061",
                            "cardPan": "0000",
                            "cardBin": null,
                            "cardExpirationDate": "2020-01-01T00:00:00.000Z",
                            "cardHolderName": "Daniel",
                            "cardToken": "",
                            "amount": 4500,
                            "currency": 978,
                            "chargeProviderFee": false,
                            "userId": "e2931920-e402-11ea-a30d-83c978a74aaa",
                            "bookingId": 376052,
                            "errorReason": "",
                            "state": 3,
                            "serviceId": 2,
                            "cardCountry": "ES",
                            "cardBrand": "VISA",
                            "cardCategory": "",
                            "cardType": null,
                            "cardSubBrand": null,
                            "card3DSVersion": null,
                            "cardAut3DSecure2Method": null,
                            "card3DS2IdMsg": null,
                            "card3DS2Partition": null,
                            "cardDcc": null,
                            "tpvUserAgent": null,
                            "tpvDeviceFingerPrint": null,
                            "tpvAlertIndicator": null,
                            "tpvCardCountrySameIPCountry": null,
                            "bicCode": "",
                            "amountInEuro": 4500,
                            "tpvAuthCode": "036564",
                            "tpvAccountCode": "",
                            "tpvID": "124439712-001",
                            "tpvConcept": "",
                            "tpvUserId": "",
                            "tpvUserToken": "",
                            "tpvScoring": 0,
                            "tpvTransactionType": 0,
                            "tpvSecurePayment": 1,
                            "securePayment": null,
                            "tpvNotificationHash": null,
                            "clientIp": "127.0.0.1",
                            "clientTC": "true",
                            "clientCountryId": 1,
                            "riskScore": 0,
                            "createdAt": "2022-01-20T22:26:26.191Z",
                            "updatedAt": "2022-01-20T22:27:30.783Z"
                        }
                    ],
                    "purchases": [],
                    "consumedVoucher": null
                }
            ],
            "limit": "2",
            "offset": "2"
        });
        return false;
        const result = await this.tropipay.set({
            token: req.token
        }).getMovements();
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