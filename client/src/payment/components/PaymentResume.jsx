import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ContentHeader from '../../app/components/Header/ContentHeader';

import { selectPaylinkData } from '../services/PaylinkSlice';
import { useSelector } from "react-redux";

import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';

function PaymentResume(props) {
    const { t } = useTranslation();
    const {
        currency,  
        amount
    } = useSelector(selectPaylinkData);

    /**
      advanced: false,
      description: "",
      amount: "",
      currency: '2',
      concept: "",
      lang: "es",
      reason: "",
      reference: ""
    */
    /*const currency = "EUR";
    const amount = 123;*/

    const selloff = 119.31;
    const cost = 3.69;

    const [accept, setAccept] = useState(false);

    const handleChange = (event) => {
        setAccept(event.currentTarget.checked);
    };

    const submit = () => {
        if (props.submit instanceof Function) {
            props.submit();
        }
    };

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} >
                <ContentHeader
                    title={t("payment.resume.title")}
                    subtitle={t("payment.resume.subtitle")}
                    className="box-label-center box-margin-bottom-2"
                />
            </Grid>

            <Grid item xs={12} >
                <div container spacing={2} className="note-bg note-border box-padding-1">
                    <Typography variant="body2">
                        {t("payment.resume.detail")}
                    </Typography>
                    <div className="box-horizontal box-align-between box-align-center">
                        <Typography variant="body2">
                            {t("payment.resume.cost")}
                        </Typography>

                        <Typography className="box-align-right">
                            {cost} {currency}
                        </Typography>
                    </div>
                    <div className="box-horizontal box-align-between box-align-center">
                        <Typography variant="body2">
                            {t("payment.resume.amount")}
                        </Typography>

                        <Typography className="box-align-right">
                            {amount} {currency}
                        </Typography>
                    </div>
                    <div className="box-horizontal box-align-between box-align-center box-label-bold">
                        <Typography variant="body2">
                            {t("payment.resume.selloff")}
                        </Typography>

                        <Typography className="box-align-right">
                            {selloff} {currency}
                        </Typography>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={accept}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={t("payment.resume.accept", { term: t("legal.terms"), policy: t("legal.policy") })}
                />
            </Grid>

            <Grid item xs={12} >
                <Button
                    variant="contained"
                    className="btn-full-width"
                    size="medium"
                    color="primary"
                    style={{ marginTop: "2rem" }}
                    disabled={!accept}
                    onClick={submit}
                >
                    {t("payment.resume.btn.next")}
                </Button>
            </Grid>

        </Grid>
    )
}

export default PaymentResume;
