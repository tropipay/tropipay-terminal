import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormControlLabel,
  Button,
  IconButton
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ContentDuplicateIcon from "mdi-react/ContentDuplicateIcon";

import ContentHeader from "../../app/components/Header/ContentHeader";
import QRCode from "../../app/components/QRcode/QRCode";
import ShareThis from "../../app/components/ShareThis/ShareThis";
import FormTextField from "../../app/components/FormControl/FormTextField";
import { nakedUrl, exec } from "../../app/services/util";
import Msg from "../../app/components/Message/Message";
import moment from "moment/moment";
import "./PaymentShow.scss";

import srvPaylink from "../services/PaylinkSlice";
import srvProfile from "../../profile/services/ProfileSlice";
import { useSelector } from "react-redux";
import FormSelect from "../../app/components/FormControl/FormSelect";
import Validation from "../../app/services/validation";

function PaymentShow(props) {
  const { t } = useTranslation();

  const profile = useSelector(srvProfile.selector.data);
  const { shortUrl, createdAt, expirationDate, id } = useSelector(
    srvPaylink.selector.data
  );
  const error = useSelector(srvPaylink.selector.error);
  const countries = useSelector(srvPaylink.selector.country);

  const [sendSMS, setSendSMS] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const message = Msg();

  function fullname(profile) {
    return profile ? profile.name + ' ' +  profile.surname : 'Gest';
  }
  
  function expireInHours(dIn, dEnd) {
    const dateIn = moment(dIn);
    const dateEnd = moment(dEnd);
    const hours = dateIn.diff(dateEnd, "hours");
    const minutes = dateIn.diff(dateEnd, "minutes");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    if (error) {
      message.traslate("error." + error);
    }
  });

  function getItems(lst) {
    if (lst && lst instanceof Array) {
      return lst.map(item => {
        return {
          label: `${item.name} (+${item.callingCode})`,
          value: item.callingCode
        };
      });
    }
    return [];
  }

  function empty(str) {
    return !str || str === "";
  }

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      code: ""
    }
  });
  const copyURL = url => {
    navigator.clipboard.writeText(url);
    message.show(t("payment.show.copyURL"));
  };

  const submit = data => {
    if (!empty(data.email) || !empty(data.phone)) {
      exec(props.submit, [
        {
          sendEmail: !empty(data.email),
          sendSMS: !empty(data.phone),
          phone: `+${data.code || ""}${data.phone || ""}`,
          notifyEmail: data.email || "",
          cardPaymentId: id
        }
      ]);
    }
  };

  const renderQrSection = () => {
    return (
      <Grid container className="payment-show-qr-section">
        <Grid item xs={6} className="box-vertical box-align-left payment-show-qr">
          <QRCode url={shortUrl} size={200} colorBorder="#1b2a62" colorBg="#FFFFFF" />
        </Grid>
        <Grid item xs={6} className="box-label-right label-size-md">
          <Typography variant="body2" className="payment-show-date ">
            {moment(createdAt).format("D MMM YYYY")}
          </Typography>
          <Typography variant="body2" className="payment-show-time">
            {moment(createdAt).format("HH:mm")}
          </Typography>
          {expirationDate && false ? (
            <div>
              <Typography variant="body2" className="">
                {t("payment.show.expireIn")}
              </Typography>
              <Typography variant="body2" className="">
                {expireInHours(createdAt, expirationDate)}
              </Typography>
            </div>
          ) : null}
        </Grid>
      </Grid>
    );
  };

  const renderOptionSection = () => {
    return (
      <Grid item xs={12}>
        <Grid container className="box-border-curved-bottom">
          <Grid item xs={12} className="note-bg payment-show-options" >
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  className="gray-label box-label-bold"
                >
                  {t("payment.show.url")}:
                </Typography>
              </Grid>

              {renderUrlSection()}

              <Grid item xs={12} className="payment-show-share">
                <ShareThis
                  sharedUrl={shortUrl}
                  className="gray-label box-label-bold"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sendSMS}
                      onChange={event =>
                        setSendSMS(event.currentTarget.checked)
                      }
                      name="sendSMS"
                      color="primary"
                    />
                  }
                  label={t("payment.show.send.sms", {
                    term: t("legal.terms"),
                    policy: t("legal.policy")
                  })}
                />
              </Grid>

              {sendSMS ? (
                <Grid item xs={12} style={{ marginTop: "1.3rem" }}>
                  <FormSelect
                    control={control}
                    name="code"
                    size="large"
                    fullWidth
                    label={t("payment.show.code")}
                    placeholder={t("payment.show.code")}
                    rules={{ required: t("error.required") }}
                    options={getItems(countries)}
                  />
                </Grid>
              ) : null}
              {sendSMS ? (
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "2rem", marginBottom: "1rem" }}
                >
                  <FormTextField
                    control={control}
                    name="phone"
                    size="large"
                    label={t("payment.show.phone")}
                    rules={{
                      required: t("error.required"),
                      pattern: Validation.number(t)
                    }}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sendEmail}
                      onChange={event =>
                        setSendEmail(event.currentTarget.checked)
                      }
                      name="sendEmail"
                      color="primary"
                    />
                  }
                  label={t("payment.show.send.email", {
                    term: t("legal.terms"),
                    policy: t("legal.policy")
                  })}
                />
              </Grid>
              {sendEmail ? (
                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                  <FormTextField
                    control={control}
                    name="email"
                    size="medium"
                    label={t("payment.show.email")}
                    rules={{
                      required: t("error.required"),
                      pattern: Validation.email(t)
                    }}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderUrlSection = () => {
    return (
      <Grid item xs={12} className="payment-show-url">
        <Typography variant="subtitle1" noWrap className="text-left payment-show-url-text">
          <span className="d-inline-block text-truncate" style={{marginRight: '1rem'}}>
            <a
              target="_blank"
              rel="noreferrer"
              href={shortUrl}
              className="btn-link"
            >
              {nakedUrl(shortUrl)}
            </a>
          </span>
          <IconButton
            key="copy"
            aria-label="Copy"
            color="inherit"
            className="gray-label"
            onClick={() => copyURL(shortUrl)}
          >
            <ContentDuplicateIcon />
          </IconButton>
        </Typography>
      </Grid>
    );
  };

  const renderBtn = () => {
    return sendSMS || sendEmail ? (
      <Button
        variant="contained"
        className="btn-full-width page-payment-btn-first-margin"
        size="large"
        color="primary"
        onClick={handleSubmit(submit)}
      >
        {t("payment.show.btn.next")}
      </Button>
    ) : null;
  };

  return (
    <div>
      <Grid
        container
        style={{ width: "100%", marginLeft: "1px" }}
        className="box-margin-bottom-2"
      >
        <Grid item xs={12}>
          <ContentHeader
            title={t("payment.show.title")}
            subtitle={t("payment.show.subtitle", { name: fullname(profile) })}
            className="box-label-center box-margin-bottom-2"
            classNameTitle="box-label-bold"
            classNameSubtitle="label-size-md payment-show-subtitle"
          />
        </Grid>

        <Grid
          item
          xs={12}
          className="payment-show-box box-border-curved"
          style={{ marginTop: "1.5rem", paddingTop: "1rem" }}
        >
          {renderQrSection()}
          {renderOptionSection()}
        </Grid>
      </Grid>

      {renderBtn()}

      {message.render()}
    </div>
  );
}

export default PaymentShow;
