export const bookingStates = {
    new: 0,
    processing: 1,
    charged: 2,
    paid: 3,
    error: 4,
    pendingIn: 5
};

/**
 * Providers List.
 */
export const providersTypeList = {
    0: "Booking",
    1: "Expedia",
    2: "Hotels",
    3: "Amadeus",
    4: "Otro",
    5: "Transfer",
    6: "Airbnb",
};

/**
 * MovementTypes.
 */
export const movementTypes = {
    transfer: 1,
    cardCredit: 2,
    refund: 3,
    cardRefund: 4,
    topUp: 5,
    exchange: 6,
    atm: 7,
    fee: 8,
};

export const serviceTypes = {
    CHARGE_OTA_CARDS: 'CHARGE_OTA_CARDS',
    CHARGE_EXTERNAL_CARDS: 'CHARGE_EXTERNAL_CARDS',
    EXTERNAL_TOPUP: 'EXTERNAL_TOPUP',
    RECHARGE: 'RECHARGE',
    GIFT_CARD: 'GIFT_CARD',
    REDEEM_CODE: 'REDEEM_CODE',
    CHARGE_USER_CARDS: 'CHARGE_USER_CARDS',
    REMITTANCE: 'REMITTANCE',
    CRYPTO_TOPUP: 'CRYPTO_TOPUP',
    PAY_WITH_TPP: 'PAY_WITH_TPP',
};