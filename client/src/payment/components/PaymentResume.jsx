import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ContentHeader from "../../app/components/Header/ContentHeader";
import { exec } from "../../app/services/util";

import srvPaylink from "../services/PaylinkSlice";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@mui/material";
import "./PaymentResume.scss";

function PaymentResume(props) {
  const { t } = useTranslation();
  const resume = useSelector(srvPaylink.selector.resume);
  const [accept, setAccept] = useState(false);

  const handleChange = event => {
    setAccept(event.currentTarget.checked);
  };

  function renderTermsAndPolicy(t, terms = "/", policy = "/") {
    return (
      <span className="btn-link label-small">
        {t("payment.resume.accept1")}
        <a href={terms} className="">
          {" "}
          {t("legal.terms")}{" "}
        </a>
        {t("payment.resume.accept2")}
        <a href={policy} className="">
          {" "}
          {t("legal.policy")}{" "}
        </a>
      </span>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <ContentHeader
          title={t("payment.resume.title")}
          subtitle={t("payment.resume.subtitle")}
          className="box-label-center box-margin-bottom-2"
          classNameTitle="box-label-bold"
          classNameSubtitle="label-size-md"
        />
      </Grid>

      <Grid item xs={12} style={{marginTop: '1rem'}}>
        <div
          container
          spacing={2}
          className="note-bg note-border box-padding-2 label-size-md"
        >
          <Typography
            variant="body2"
            className="box-label-bold text-color-gray "
          >
            {t("payment.resume.detail")}
          </Typography>
          <div className="box-horizontal box-align-between box-align-center box-margin-top-1 label-size-md">
            <Typography variant="body2">{t("payment.resume.cost")}</Typography>

            <Typography className="box-align-right">
              {getResume(resume, "cost", "amount")}{" "}
              {getResume(resume, "cost", "currency")}
            </Typography>
          </div>
          <div className="box-horizontal box-align-between box-align-center box-margin-top-1 label-size-md">
            <Typography variant="body2">
              {t("payment.resume.amount")}
            </Typography>

            <Typography className="box-align-right">
              {getResume(resume, "current", "amount")}{" "}
              {getResume(resume, "current", "currency")}
            </Typography>
          </div>
          <div className="box-horizontal box-align-between box-align-center box-label-bold box-margin-top-1 label-size-md">
            <Typography variant="body2">
              {t("payment.resume.selloff")}
            </Typography>

            <Typography className="box-align-right">
              {getResume(resume, "delivery", "amount")}{" "}
              {getResume(resume, "delivery", "currency")}
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={accept}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label={renderTermsAndPolicy(
            t,
            "http://tropipay-dev.herokuapp.com/terms",
            "http://tropipay-dev.herokuapp.com/privacy"
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          className="btn-full-width"
          size="large"
          color="primary"
          style={{ marginTop: "1rem" }}
          disabled={!accept}
          onClick={() => exec(props.submit)}
        >
          {t("payment.resume.btn.next")}
        </Button>
      </Grid>
    </Grid>
  );
}

function getResume(data, scope, key) {
  if (data && data[scope] && data[scope][key]) {
    return data[scope][key];
  }
  return "";
}

export default PaymentResume;
