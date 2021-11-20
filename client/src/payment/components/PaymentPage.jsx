import React from 'react';

import { useTranslation } from "react-i18next";

function PaymentPage(props) {
  const { t } = useTranslation();

  return (
    <div className="Demo">
      {t("demo.title", { test: 'payment' })}

    </div>
  );
}

export default PaymentPage;
