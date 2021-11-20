import Button from "@mui/material/Button";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import ShareThis from '../../app/components/ShareThis/ShareThis';

function PaymentPage() {
  const dispatch = useDispatch();
  const count = 1; 
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="Demo">
      {t("demo.title", { test: 'payment' })}
      <ShareThis />
    </div>
  );
}

export default PaymentPage;
