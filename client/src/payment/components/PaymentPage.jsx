import React from 'react';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PaymentFrom from './PaymentFrom';
import PaymentResume from './PaymentResume';
import PaymentShow from './PaymentShow';


import StepperControl from '../../app/components/StepperControl';

import Button from "@material-ui/core/Button";

function PaymentPage(props) {

  const { t } = useTranslation();
  const history = useHistory();
  const stepper = StepperControl();

  stepper.add(() => <PaymentFrom submit={(payload) => {
    console.log(" PaymentFrom >>>>>>>", payload);
    stepper.next();
  }} />);

  stepper.add(() => <PaymentResume submit={() => {
    console.log(" PaymentResume >>>>>>>");
    stepper.next();
  }} />);
  
  stepper.add(() => <PaymentShow  />);

  stepper.subscribe((step, dir) => {
    console.log(">> PAGE #", step, dir);
  });

  const renderControls = (t, history) => {
    let page = "";

    switch (stepper.index) {
      case 0: page = "form"; break;
      case 1: page = "resume"; break;
      default: page = "show"; break;
    }

    return (
      <Button
        variant="contained"
        className="btn-full-width"
        size="large"
        style={{ marginTop: "1rem" }}
        onClick={() => history.push('/home')}
        color="secondary"
      >
        {t("payment." + page + ".btn.back")}
      </Button>
    );
  }

  return (
    <div className="page-margin">
      {stepper.render()}
      {renderControls(t, history)}
    </div>
  );
}

export default PaymentPage;
