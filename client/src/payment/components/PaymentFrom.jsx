import React from 'react'

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { Button } from "@material-ui/core";
import FormText from '../../app/components/FormControl/FormText';
import FormSelect from '../../app/components/FormControl/FormSelect';
import FromCheckBox from '../../app/components/FormControl/FromCheckBox';

import Grid from '@material-ui/core/Grid';
import Lang from '../../app/services/lang';

function PaymentFrom(props) {
  const { t } = useTranslation()

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      amount: "",
      currency: '2',
      concept: "",
      lang: "es",
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

  const options = [
    {
      label: "Checkbox Option 1",
      value: "1",
    },
    {
      label: "Checkbox Option 2",
      value: "2",
    },
  ];

  const onSubmit = (data) => console.log(data)

  return (
    <div className="Demo" >
      <Grid container spacing={2}>

        <Grid item xs={12} sm={7}>
          <FormText
            control={control}
            name="amount"
            label={t("payment.from.amount.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <FormSelect
            control={control}
            name="currency"
            value="1"
            options={coinOptions}
          />
        </Grid>

        <Grid item xs={12} >
          <FormText
            control={control}
            name="concept"
            label={t("payment.from.concept.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>

        <Grid item xs={12} >
          <FromCheckBox
            control={control}
            setValue={setValue}
            options={[{
              label: t("payment.from.advanced"),
              value: "1",
            }]}
            name="advanced"
          />
        </Grid>

        <Grid item xs={12} >
          <FormText
            control={control}
            name="reference"
            label={t("payment.from.reference.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>

        <Grid item xs={12} >
          <FormText
            control={control}
            name="reason"
            label={t("payment.from.reason.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>

        <Grid item xs={12} >
          <FormSelect
            control={control}
            name="lang"
            value="1"
            keys={{ label: 'label', value: "lang" }}
            options={Lang.getSupported()}
          />
        </Grid>

        <Grid item xs={12} >
          <FormText
            control={control}
            name="description"
            label={t("payment.from.description.label")}
            rules={{ required: t("error.required") }}
          />
        </Grid>

      </Grid>

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"} fullWidth>
        SEND
      </Button>
    </div>
  )
}

export default PaymentFrom
