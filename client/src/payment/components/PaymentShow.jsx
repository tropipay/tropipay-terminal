import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import moment from 'moment';

import { Link } from "react-router-dom";
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ContentDuplicateIcon from 'mdi-react/ContentDuplicateIcon';
import Button from "@mui/material/Button";

import { nakedUrl } from '../../app/services/util';
import ShareThis from '../../app/components/ShareThis/ShareThis';
import QRCode from '../../app/components/QRcode/QRCode';

function PaymentShow(props) {
  const dispatch = useDispatch();
  const count = 1;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const _copyURL = (url) => {
    const { t } = props;
    navigator.clipboard.writeText(url);
    this.setState({
      message: t('BookingChargeForm.paymentGenerated.copyURL'),
      showMessage: true,
    });
  };

  const _handleSubmitNotify = event => {
    const payload = {
      cardPaymentId: this.state.cardObj.id,
      //payWithTppData: this.state.payWithTppData,
      sendEmail: this.state.sendEmail,
      notifyEmail: this.state.notifyEmail,
      sendSMS: this.state.sendSMS,
      phone: `${this.state.callingCode.replace(/\\s/g, "")}${this.state.phone.replace(/\\s/g, "")}`,
    };
    event.preventDefault();
    this._loadingInit();
    PaymentCardActions.Notify(payload);
  };

  const urlQr = "http://google.com";
  return (
    <div className="Demo">
      {t("demo.title", { test: 'payment' })}
      <ShareThis />

      <ValidatorForm
        ref="form"
        autoComplete="off"
        onSubmit={_handleSubmitNotify}
        onError={(errors) => console.debug(errors)}
      >
        <div className="pt-3 text-left qrCodeContainer d-flex">
          <QRCode className="qrCode ml-0 mb-3 col-6" url={urlQr} />
          <div className="mt-0 text-right col-6">
            <div>{moment().format("DD.MM.YYYY")}</div>
            <div className="font-weight-bold">{`${(
              this._getAmountInDestination().amountToChargeInEUR / 100
            ).toFixed(2)} ${
              this._getAmountInDestination().currencyToWork
              }`}</div>
          </div>
        </div>
        <div className="box-info">
          <div className="mt1 col-xs-12 ">
            <div className="text-left">
              <Typography
                variant="subtitle1"
                className="text-left mt-4 font-weight-bold gray-label"
              >
                {t("BookingChargeForm.paymentGenerated.url")}:
                                    </Typography>
              <Typography
                variant="subtitle1"
                noWrap
                className="text-left mt-1"
              >
                <span className="d-inline-block text-truncate mr-2">
                  <a target="_blank"
                    href={this.state.cardObj.shortUrl}
                    className="link-blue"
                  >
                    {nakedUrl(this.state.cardObj.shortUrl)}
                  </a>
                </span>
                <IconButton
                  key="copy"
                  aria-label="Copy"
                  color="inherit"
                  className="gray-label"
                  onClick={() =>
                    _copyURL(this.state.cardObj.shortUrl)
                  }
                >
                  <ContentDuplicateIcon />
                </IconButton>
              </Typography>
            </div>
          </div>
          <ShareThis
            sharedUrl={this.state.cardObj.shortUrl}
            className="mb-3"
          />
          <FormControlLabel
            className="mt-1 w-100 mb-0"
            control={
              <Checkbox
                name="sendEmail"
                className="py-1"
                color="primary"
                checked={this.state.sendEmail}
                onChange={this._handleFieldChange}
                value="sendEmail"
              />
            }
            label={t("BookingChargeForm.paymentGenerated.emailTo")}
          />
          {this.state.sendEmail ? (
            <div className="text-center">
              <TextValidator
                style={{ marginTop: "0" }}
                name="notifyEmail"
                placeholder={t(
                  "BookingChargeForm.paymentGenerated.emailTo"
                )}
                label={t(
                  "BookingChargeForm.paymentGenerated.emailTo"
                )}
                variant="outlined"
                value={this.state.notifyEmail}
                margin="normal"
                onChange={this._handleFieldChange}
                fullWidth
                required={true}
                validators={["required", "isEmail"]}
                errorMessages={[
                  t("Error.required"),
                  t("Error.email"),
                ]}
                className="mb2"
              />
            </div>
          ) : (
              ""
            )}
          <FormControlLabel
            className="mt-1 w-100 mb-0"
            control={
              <Checkbox
                name="sendSMS"
                className="py-1"
                color="primary"
                checked={this.state.sendSMS}
                onChange={this._handleFieldChange}
                value="sendSMS"
              />
            }
            label={t("BookingChargeForm.paymentGenerated.sendSMS")}
          />
          {this.state.sendSMS ? (
            <div>
              <div className="text-center">
                <SelectValidator
                  style={{ marginTop: "0" }}
                  name="callingCode"
                  label={t(
                    "BookingChargeForm.paymentGenerated.callingCode"
                  )}
                  select
                  value={this.state.callingCode}
                  onChange={this._handleSelectChange("callingCode")}
                  required={true}
                  fullWidth
                  margin="normal"
                  className="text-left"
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={[t("Error.required")]}
                >
                  {this.state.countries.map((country) => {
                    if (country.callingCode !== null) {
                      return (
                        <MenuItem
                          key={country.id}
                          value={
                            country.callingCode !== ""
                              ? `+${country.callingCode}`
                              : ""
                          }
                        >
                          {`${country.name} (+${country.callingCode})`}
                        </MenuItem>
                      );
                    } else return null;
                  })}
                </SelectValidator>
              </div>
              <TextValidator
                name="phone"
                placeholder={t(
                  "BookingChargeForm.paymentGenerated.phone"
                )}
                label={t("Register.phone.label")}
                variant="outlined"
                value={
                  this.state.callingCode !== ""
                    ? `${this.state.callingCode} ${this.state.phone}`
                    : this.state.phone
                }
                margin="normal"
                onChange={this._handleFieldChange}
                fullWidth
                required={true}
                validators={[
                  "required",
                  "matchRegexp:^([+(\\d]{1})(([\\d+() -.]){7,13})([+(\\d]{1})$",
                ]}
                errorMessages={[
                  t("Error.required"),
                  t("Error.phone"),
                ]}
                className="mb2"
              />
            </div>
          ) : (
              ""
            )}
        </div>
        <div className="text-right">
          {this.state.sendEmail || this.state.sendSMS ? (
            <Button
              type="submit"
              variant="contained"
              className="mt-3 btn-full-width"
              size="large"
              color="primary"
            >
              {t("BookingChargeForm.paymentGenerated.btnSend")}
            </Button>
          ) : (
              ""
            )}
          <Button
            variant="contained"
            className="mt-4 btn-full-width"
            size="large"
            onClick={this._handleClose}
            color={"secondary"}
          >
            {t("BookingChargeForm.btnHome")}
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
}

export default PaymentShow;
