import React from 'react';

import PaymentFrom from './PaymentFrom';
//import { useTranslation } from "react-i18next";

function PaymentPage(props) {
  //const { t } = useTranslation();

  return (
    <div className="Demo">
      <PaymentFrom />
    </div>
  );
}

export default PaymentPage;
