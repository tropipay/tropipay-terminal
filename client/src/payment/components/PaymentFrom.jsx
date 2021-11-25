import React from 'react';

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from "@material-ui/core";

import FormTextField from '../../app/components/FormControl/FormTextField';
import FormSelect from '../../app/components/FormControl/FormSelect';
import FromCheckBox from '../../app/components/FormControl/FromCheckBox';
import ContentHeader from '../../app/components/ContentHeader';

import Grid from '@material-ui/core/Grid';
import Lang from '../../app/services/lang';

function PaymentFrom(props) {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      advanced: false,
      description: "",
      amount: "",
      currency: '2',
      concept: "",
      lang: "es",
      reason: "",
      reference: ""
    }
  });

  const coinOptions = [
    {
      label: "Dropdown Option 1",
      value: "1",
    },
    {
      label: "Dropdown Option 2",
      value: "2",
    },
    {
      label: "Dropdown Option 3",
      value: "3",
    }
  ];

  const submit = (data) => {
    if (props.submit instanceof Function) {
      props.submit(data);
    }
  };

  return (
    <Grid container spacing={2}>

      <Grid item xs={12} >
        <ContentHeader
          title={t("payment.form.title")}
          subtitle={t("payment.form.subtitle")}
          className="text-align-center"
        />
      </Grid>

      <Grid item xs={12} sm={7}>
        <FormTextField
          control={control}
          name="amount"
          size="medium"
          label={t("payment.form.amount.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <FormSelect
          control={control}
          name="currency"
          size="medium"
          value="1"
          options={coinOptions}
        />
      </Grid>

      <Grid item xs={12} >
        <FormTextField
          control={control}
          name="concept"
          size="medium"
          label={t("payment.form.concept.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12} >
        <FromCheckBox
          name="advanced"
          size="medium"
          control={control}
          label={t("payment.form.advanced")}
        />
      </Grid>

      <Grid item xs={12} >
        <FormTextField
          control={control}
          name="reference"
          size="medium"
          label={t("payment.form.reference.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12} >
        <FormTextField
          name="reason"
          size="medium"
          control={control}
          label={t("payment.form.reason.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12} >
        <FormSelect
          control={control}
          name="lang"
          value="1"
          size="medium"
          keys={{ label: 'label', value: "lang" }}
          options={Lang.getSupported()}
        />
      </Grid>

      <Grid item xs={12} >
        <FormTextField
          control={control}
          name="description"
          multiline={true}
          size="medium"
          label={t("payment.form.description.label")}
          rules={{ required: t("error.required") }}
        />
      </Grid>

      <Grid item xs={12} >
        <Button
          variant="contained"
          className="btn-full-width"
          size="medium"
          color="primary"
          onClick={handleSubmit(submit)}
        >
          {t("payment.form.btn.next")}
        </Button>
      </Grid>

    </Grid>
  )
}

export default PaymentFrom;
