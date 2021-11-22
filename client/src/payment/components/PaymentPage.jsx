import React from 'react';

import { useTranslation } from "react-i18next";
import PaymentFrom from './PaymentFrom-old'

function PaymentPage(props) {
  const { t } = useTranslation();

  return (
    <div className="Demo">
      <PaymentFrom />
    </div>
  );
}

export default PaymentPage;
