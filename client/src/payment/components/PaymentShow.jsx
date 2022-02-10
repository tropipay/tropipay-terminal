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

import srvPaylink from "../services/PaylinkSlice";
import { useSelector } from "react-redux";

function PaymentShow(props) {
  const { t } = useTranslation();
  const { shortUrl, createdAt, expirationDate, id } = useSelector(
    srvPaylink.selector.data
  );
  const error = useSelector(srvPaylink.selector.error);

  const [sendSMS, setSendSMS] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const message = Msg();

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
          phone: `${(data.code || "").replace(/\\s/g, "")}${(
            data.phone || ""
          ).replace(/\\s/g, "")}`,
          notifyEmail: data.email,
          cardPaymentId: id
        }
      ]);
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ width: "100%", marginLeft: "1px" }}
        className="box-margin-bottom-2"
      >
        <Grid item xs={12}>
          <ContentHeader
            title={t("payment.show.title")}
            subtitle={t("payment.show.subtitle")}
            className="box-label-center box-margin-bottom-2"
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} className="box-border-curved">
            <Grid
              container
              spacing={2}
              className="box-padding-bottom-2 box-padding-top-2"
            >
              <Grid
                item
                xs={12}
                sm={6}
                className="box-vertical box-align-center"
              >
                <QRCode url={shortUrl} size={200} />
              </Grid>
              <Grid item xs={12} sm={6} className="box-label-right ">
                <Typography variant="body2" className="box-padding-right-2">
                  {moment(createdAt).format("LLL")}
                </Typography>
                {expirationDate ? (
                  <div>
                    <Typography variant="body2" className="box-padding-right-2">
                      {t("payment.show.expireIn")}
                    </Typography>
                    <Typography variant="body2" className="box-padding-right-2">
                      {expireInHours(createdAt, expirationDate)}
                    </Typography>
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={12} className="note-bg" style={{ padding: "2rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    className="gray-label box-label-bold"
                  >
                    {t("payment.show.url")}:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    className="text-left mt-1"
                  >
                    <span className="d-inline-block text-truncate mr-2">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={shortUrl}
                        className="link-blue"
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

                <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <FormTextField
                      control={control}
                      name="code"
                      size="medium"
                      label={t("payment.show.code") + " *"}
                      rules={{ required: t("error.required") }}
                    />
                  </Grid>
                ) : null}
                {sendSMS ? (
                  <Grid item xs={12}>
                    <FormTextField
                      control={control}
                      name="phone"
                      size="medium"
                      label={t("payment.show.phone") + " *"}
                      rules={{ required: t("error.required") }}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <FormTextField
                      control={control}
                      name="email"
                      size="medium"
                      label={t("payment.show.email") + " *"}
                      rules={{ required: t("error.required") }}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {sendSMS || sendEmail ? (
        <Button
          variant="contained"
          className="btn-full-width"
          size="large"
          color="primary"
          style={{ marginTop: "2rem" }}
          onClick={handleSubmit(submit)}
        >
          {t("payment.show.btn.next")}
        </Button>
      ) : null}

      {message.render()}
    </div>
  );
}

export default PaymentShow;
