import React from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PaymentFrom from './PaymentFrom';
import PaymentResume from './PaymentResume';
import StepperControl from '../../app/components/StepperControl';

import Button from "@material-ui/core/Button";

function PaymentPage(props) {

  const history = useHistory();
  const { t } = useTranslation();
  const stepper = StepperControl();

  stepper.add(() => <PaymentFrom submit={(payload) => {
    console.log(">>>>>>>", payload);
    stepper.next();
  }} />);

  stepper.add(() => <PaymentResume />);

  stepper.subscribe((step, dir) => {
    console.log(">> PAGE #", step, dir);
  });

  const renderControls = (t, history) => {
    let page = "";
    
    switch (stepper.index) {
      case 0: page = "form"; break;
      case 1: page = "resumen"; break;
      default: page = "show"; break;
    }

    return (
      <Button
        variant="contained"
        className="btn-full-width"
        size="large"
        onClick={() => history.push('/home')}
        color="secondary"
      >
        {t("payment." + page + ".btn.back")}
      </Button>
    );
  }

  return (
    <div>
      {stepper.render()}
      {renderControls(t, history)}
    </div>
  );
}

export default PaymentPage;
