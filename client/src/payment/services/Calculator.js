class Calculator {
    /**
     * @param payload.rate
     * @param payload.amount
     * @param payload.currency
     * @param payload.service.tp_fee_fixed
     * @param payload.service.tp_fee_percent
     * @param payload.service.service_fee_fixed
     * @param payload.service.service_fee_percent
     */
    getResume(payload) {
        const data = this.getAmountInDestination(payload);
        const defaultValues = {
            'amount': 0,
            'currency': 'EUR'
        };
        //... Applied exchange rate
        const rate = Math.round(10000 * data.currentRate) / 10000;
        //... Cost of service
        const cost = data && data.amountToChargeInEUR ? {
            'amount': (data.amountToChargeInEUR / 100 - data.destinationValue).toFixed(2),
            'currency': data.currencyToWork
        } : defaultValues;
        //... Amount over TropiPay base currency (EUR)
        const current = data && data.amountToChargeInEUR ? {
            'amount': (data.amountToChargeInEUR / 100).toFixed(2),
            'currency': data.currencyToWork
        } : defaultValues;
        //... Amount over the currency selected by the user (USD), without applying field rate
        const original = data && data.originalCurrencyAmount ? {
            'amount': (data.originalCurrencyAmount / 100).toFixed(2),
            'currency': data.originalCurrency
        } : defaultValues;
        //... Amount deposited in the TropiPay account (EUR), discounting the cost of the service
        const delivery = data && data.destinationValue ? {
            'amount': data.destinationValue.toFixed(2),
            'currency': data.currencyToWork
        } : defaultValues;

        return {
            rate, // Tipo de cambio aplicado
            cost, // costo del servicio
            current, // importe
            original, // importe original en caso de que no conincida la moneda con la base de operaciones (EUR)
            delivery
        };
    }

    /**
     * @param payload.rate
     * @param payload.amount
     * @param payload.currency
     * @param payload.service.tp_fee_fixed
     * @param payload.service.tp_fee_percent
     * @param payload.service.service_fee_fixed
     * @param payload.service.service_fee_percent
     */
    getAmountInDestination(payload) {
        payload = payload || "";
        const amount = (!payload.amount || payload.amount === '') ? 0 : (
            typeof (payload.amount) === 'string' ?
            payload.amount.split(",").join(".") :
            payload.amount
        );
        const inCents = Math.round(parseFloat(amount) * 100);
        const usd2eur = payload.rate;
        const originalCurrency = payload.currency;
        const currencyToWork = "EUR";

        const ourMargin = payload.service.tp_fee_percent / 10000;
        const ourMarginFixed = payload.service.tp_fee_fixed;
        const cardProviderFeePercent = payload.service.service_fee_percent / 10000;
        const cardProviderFeeFixed = payload.service.service_fee_fixed;

        const currentRate = () => {
            return payload.currency === "USD" ? payload.rate : 1;
        };

        const amountToChargeInEUR = () => (payload.currency === 'EUR' ? inCents : Math.floor(inCents / usd2eur));

        const destinationValue = () => {
            return Math.round(amountToChargeInEUR() - (amountToChargeInEUR() * (ourMargin + cardProviderFeePercent)) - (ourMarginFixed + cardProviderFeeFixed)) / 100;
        };

        return {
            ourMargin: ourMargin,
            currentRate: currentRate(),
            originalCurrencyAmount: inCents,
            originalCurrency: originalCurrency,
            amountToChargeInEUR: amountToChargeInEUR(),
            destinationValue: destinationValue(),
            serviceCost: Math.round(inCents * ourMargin) / 100 + ourMarginFixed + cardProviderFeeFixed,
            bankTransferFeePercent: null,
            bankTransferFee: null,
            cardProviderFeePercent: cardProviderFeePercent,
            cardProviderFee: Math.round(inCents * cardProviderFeePercent) / 100,
            currencyToWork: currencyToWork,
            cubanAccount: null,
            bankTransferFeeType: null,
            ourMarginFixed,
            cardProviderFeeFixed
        }
    };

    /**
     * @description fix amount 
     * @param {NUMBER} amount
     * @param {NUMBER} place     
     * @return {NUMBER}
     */
    fix(amount, place = 2) {
        amount = parseFloat(amount) || 0;
        return (amount / 100).toFixed(place);
    }
}

// ......................................................................
const lib = new Calculator();
lib.Cls = Calculator;
// ......................................................................
export default lib;