import React from 'react'

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import { Button } from "@material-ui/core";
import FormText from '../../app/components/FormControl/FormText';
import FormSelect from '../../app/components/FormControl/FormSelect';


function PaymentFrom(props) {
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      control: "",
      coin: '2'
    }
  });

  const onSubmit = (data) => console.log(data)

  return (
    <div className="Demo">
      <div>
        <FormText
          control={control}
          name="control"
          label={t("demo.title")}
          rules={{ required: t("error.required") }}
        />
        <FormSelect
          control={control}
          name="coin"
          value="1"
          options={[
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
          ]}
        />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          SEND
          </Button>
      </div>
    </div>
  )
}

export default PaymentFrom
