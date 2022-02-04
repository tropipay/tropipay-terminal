class Calculator {
    /**
     * @param payload.amount
     * @param payload.rate
     * @param payload.currency
     * @param payload.service.tp_fee_percent
     * @param payload.service.tp_fee_fixed
     * @param payload.service.service_fee_percent
     * @param payload.service.service_fee_fixed
     */
    getInfo(payload) {
        const amountInDestination = this.getAmountInDestination(payload);
        return amountInDestination && amountInDestination.destinationValue ? {
            'amount': amountInDestination.destinationValue.toFixed(2),
            'currency': amountInDestination.currencyToWork
        } : {
            'amount': 0,
            'currency': 'EUR'
        };
    }

    /**
     * @param payload.amount
     * @param payload.rate
     * @param payload.currency
     * @param payload.service.tp_fee_percent
     * @param payload.service.tp_fee_fixed
     * @param payload.service.service_fee_percent
     * @param payload.service.service_fee_fixed
     */
    getAmountInDestination(payload) {
        const amount = payload.amount;
        const inCents = Math.round(parseFloat(amount.split(",").join(".")) * 100);
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
}