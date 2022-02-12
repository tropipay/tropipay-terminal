import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PaymentFrom from "./PaymentFrom";
import PaymentResume from "./PaymentResume";
import PaymentShow from "./PaymentShow";
import StepperControl from "../../app/components/Stepper/StepperControl";

import srvPaylink from "../services/PaylinkSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";


function PaymentPage(props) {
  //... initialize state
  const { t } = useTranslation();
  const history = useHistory();
  const stepper = StepperControl();
  const dispatch = useDispatch();

  const paylink = useSelector(srvPaylink.selector.data);
  const fee = useSelector(srvPaylink.selector.fee);

  useEffect(() => {
    if (!fee.loaded) {
      dispatch(srvPaylink.action.loadfee());
      dispatch(srvPaylink.action.loadCountryConde());
    }
  }, [fee, dispatch]);

  //... define components by step
  const steps = [
    () => (
      <PaymentFrom
        submit={async payload => {
          dispatch(srvPaylink.action.update(payload));
          stepper.next();
        }}
      />
    ),
    () => (
      <PaymentResume
        submit={() => {
          dispatch(srvPaylink.action.create(paylink));
          stepper.next();
        }}
      />
    ),
    () => (
      <PaymentShow
        submit={payload => {
          dispatch(srvPaylink.action.share(payload));
          history.push('/');
        }}
      />
    )
  ];

  // ... set components to stepper
  stepper.add(steps);
  stepper.subscribe((step, dir) => console.log(">> PAGE #", step, dir));

  function getPageName(index) {
    switch (index) {
      case 0:
        return "form";

      case 1:
        return "resume";

      default:
        return"show";
    }
  }
  // ... define render controls
  const renderControls = (t, history) => {
    const page = getPageName(stepper.index);
    return (
      <Button
        variant="contained"
        className="btn-full-width"
        size="large"
        style={{ marginTop: "2rem" }}
        onClick={() => history.push("/home")}
        color="secondary"
      >
        {t("payment." + page + ".btn.back")}
      </Button>
    );
  };

  // ... render componet
  return (
    <div className="page-margin page-padding">
      {stepper.render()}
      {renderControls(t, history)}
    </div>
  );
}

export default PaymentPage;
