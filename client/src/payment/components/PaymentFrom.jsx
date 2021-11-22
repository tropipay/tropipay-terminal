import React from 'react'

import { useTranslation } from 'react-i18next'
import lang from '../../app/services/lang'

import { useForm, Controller } from 'react-hook-form'
import { Button, Paper, Typography } from "@material-ui/core";
import FormInputText from '../../app/components/FormControl/FormInputText'

function PaymentFrom(props) {
  const { t } = useTranslation()

  const formMethods = useForm({
    defaultValues: {
      textValue: '',
      radioValue: '',
      checkboxValue: [],
      dateValue: new Date(),
      dropdownValue: '',
      sliderValue: 0,
    },
  })
  const { handleSubmit, reset, control, setValue } = formMethods;

  const onSubmit = (data) => console.log(data)

  return (
    <div className="Demo">
      {t('demo.title', { test: 'PaymentFrom' })}

      <div>
        <FormInputText name="textValue" control={control} label="Text Input" />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          SEND
        </Button>
      </div>
    </div>
  )
}

export default PaymentFrom
