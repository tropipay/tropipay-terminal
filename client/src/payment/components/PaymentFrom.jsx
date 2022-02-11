import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import FormTextField from "../../app/components/FormControl/FormTextField";
import FormSelect from "../../app/components/FormControl/FormSelect";
import ContentHeader from "../../app/components/Header/ContentHeader";
import Validation from "../../app/services/validation";

import Grid from "@material-ui/core/Grid";
import Lang from "../../app/services/lang";
import Currency from "../../app/services/currency";
import './PaymentFrom.scss';

//... redux
import { useDispatch, useSelector } from "react-redux";
import srvReason from "../services/ReasonSlice";

//... component
function PaymentFrom(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reasons = useSelector(srvReason.selector.data);
  const [advanced, setAdvanced] = useState(false);

  if (!reasons || reasons.length < 1) {
    dispatch(srvReason.action.onLoad());
  }

  const amountMin = 16;
  const { handleSubmit, control } = useForm({
    defaultValues: {
      advanced: false,
      description: "",
      amount: "",
      currency: "",
      concept: "",
      lang: "",
      reason: "",
      reference: ""
    }
  });

  const submit = data => {
    if (props.submit instanceof Function) {
      props.submit(data);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ContentHeader
          title={t("payment.form.title")}
          subtitle={t("payment.form.subtitle")}
          className="box-label-center box-margin-bottom-2"
          classNameTitle="box-label-bold"
        />
      </Grid>

      <Grid item xs={12} sm={7}>
        <FormTextField
          control={control}
          name="amount"
          size="large"
          label={t("payment.form.amount.label")}
          rules={{
            required: Validation.required(t),
            min: Validation.min(t, amountMin),
            pattern: Validation.number(t)
          }}
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <FormSelect
          control={control}
          name="currency"
          size="large"
          fullWidth
          label={t("payment.form.currency.label")}
          placeholder={t("payment.form.currency.label")}
          rules={{ required: t("error.required") }}
          options={Currency.list()}
        />
      </Grid>

      <Grid item xs={12}>
        <FormTextField
          control={control}
          name="concept"
          size="large"
          label={t("payment.form.concept.label")}
          rules={{
            required: Validation.required(t),
            maxLength: Validation.maxStrLength(t),
            pattern: Validation.string(t)
          }}
        />
      </Grid>

      <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            className="payment-form-checkbox"
            label={t("payment.form.advanced")}
            value={advanced}
            onChange={() => setAdvanced(!advanced)}
          />
      </Grid>

      {advanced ? (
        <Grid item xs={12}>
          <FormTextField
            control={control}
            name="reference"
            size="large"
            label={t("payment.form.reference.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <FormSelect
          control={control}
          name="reason"
          size="large"
          value="1"
          fullWidth
          label={t("payment.form.reason.label")}
          placeholder={t("payment.form.reason.label")}
          rules={{ required: t("error.required") }}
          options={getItems(reasons)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormSelect
          control={control}
          name="lang"
          size="large"
          label={t("payment.form.lang.label")}
          placeholder={t("payment.form.lang.label")}
          keys={{ label: "label", value: "lang" }}
          rules={{ required: t("error.required") }}
          options={Lang.getSupported()}
        />
      </Grid>

      <Grid item xs={12}>
        <FormTextField
          control={control}
          name="description"
          multiline
          rows="3"
          size="large"
          label={t("payment.form.description.label")}
          placeholder={t("payment.form.description.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          className="btn-full-width"
          size="large"
          color="primary"
          style={{ marginTop: "2rem" }}
          onClick={handleSubmit(submit)}
        >
          {t("payment.form.btn.next")}
        </Button>
      </Grid>
    </Grid>
  );
}

function getItems(lst) {
  if (lst && lst instanceof Array) {
    return lst.map(item => {
      return {
        label: item.name,
        value: item.id
      };
    });
  }
  return [];
}

export default PaymentFrom;
