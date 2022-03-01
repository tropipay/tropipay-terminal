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
import srvPaylink from "../services/PaylinkSlice";

//... component
function PaymentFrom(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reasons = useSelector(srvReason.selector.data);
  const [advanced, setAdvanced] = useState(false);

  if (!reasons || reasons.length < 1) {
    dispatch(srvReason.action.onLoad());
  }

  const amountMin = useSelector(srvPaylink.selector.amountmin);
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      amount: "",
      currency: "EUR",
      concept: "",
      lang: "es",
      reason: 9,
      description: t("payment.form.reason.default"),
      reasonDes: t("payment.form.reason.default"),
      reference: ""
    }
  });
  const watchFields = watch({ "amount": "amount", "currency": "currency", "description": "description", "concept": "concept", "lang": "lang", "reason": "reason", "reference": "reference" });

  function isValidForm(watchFields) {
    const mandatory = watchFields.amount !== "" &&
      watchFields.concept !== "" &&
      watchFields.currency !== "" &&
      watchFields.description !== "" &&
      watchFields.lang !== "" &&
      watchFields.reason !== "";
    return advanced ? mandatory && watchFields.reference !== "" : mandatory;
  }

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
          classNameSubtitle="label-size-md"
        />
      </Grid>

      <Grid item xs={12} sm={7}>
        <FormTextField
          control={control}
          name="amount"
          size="medium"
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
          defaultValue={watchFields.currency}
          size="medium"
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
          size="medium"
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
            size="medium"
            label={t("payment.form.reference.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>
      ) : null}

      {advanced ? (<Grid item xs={12}>
        <FormSelect
          control={control}
          name="reason"
          size="medium"
          value="1"
          fullWidth
          defaultValue={watchFields.reason}
          label={t("payment.form.reason.label")}
          placeholder={t("payment.form.reason.label")}
          rules={{ required: t("error.required") }}
          options={getItems(reasons)}
        />
      </Grid>
      ) : null}

      {advanced && watchFields.reason === 9 ? (
        <Grid item xs={12}>
          <FormTextField
            control={control}
            name="reasonDes"
            size="medium"
            label={t("payment.form.reason.des")}
            rules={{ required: t("error.required") }}
          />
        </Grid>
      ) : null}

      {advanced ? (
        <Grid item xs={12}>
          <FormSelect
            control={control}
            name="lang"
            size="medium"
            defaultValue={watchFields.lang}
            label={t("payment.form.lang.label")}
            placeholder={t("payment.form.lang.label")}
            keys={{ label: "label", value: "lang" }}
            rules={{ required: t("error.required") }}
            options={Lang.getSupported()}
          />
        </Grid>
      ) : null}

      {advanced ? (
        <Grid item xs={12}>
          <FormTextField
            control={control}
            name="description"
            multiline
            minRows="3"
            size="medium"
            label={t("payment.form.description.label")}
            placeholder={t("payment.form.description.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <Button
          variant="contained"
          className="btn-full-width"
          size="medium"
          color="primary"
          disabled={!isValidForm(watchFields)}
          style={{ marginTop: "1rem" }}
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
