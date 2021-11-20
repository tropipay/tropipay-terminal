import React from 'react';

import { useTranslation } from "react-i18next";

function PaymentResume(props) {
    const { t } = useTranslation();

    return (
        <div className="Demo">
            {t("demo.title", { test: 'PaymentResume' })}

        </div>
    );
}

export default PaymentResume;
