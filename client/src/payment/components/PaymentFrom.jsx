import React from 'react';

import { useTranslation } from "react-i18next";

function PaymentFrom(props) {
    const { t } = useTranslation();

    return (
        <div className="Demo">
            {t("demo.title", { test: 'PaymentFrom' })}

        </div>
    );
}

export default PaymentFrom;
