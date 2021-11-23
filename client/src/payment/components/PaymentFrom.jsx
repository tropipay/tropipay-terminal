import React from 'react'

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { Button } from "@material-ui/core";
import FormText from '../../app/components/FormControl/FormText';
import FormSelect from '../../app/components/FormControl/FormSelect';
import Grid from '@material-ui/core/Grid';


function PaymentFrom(props) {
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      amount: "",
      currency: '2',
      concept: ""
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
      </Grid>

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"} fullWidth> 
        SEND
      </Button>
    </div>
  )
}

export default PaymentFrom
