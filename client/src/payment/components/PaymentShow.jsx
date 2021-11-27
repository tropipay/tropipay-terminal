import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import ContentHeader from '../../app/components/ContentHeader';
import QRCode from '../../app/components/QRcode/QRCode';
import ShareThis from '../../app/components/ShareThis/ShareThis';
import FormTextField from '../../app/components/FormControl/FormTextField';

function PaymentShow(props) {
    const { t } = useTranslation();

    const currency = "EUR";
    const amount = 123;
    const selloff = 119.31;
    const cost = 3.69;
    const plDate = "12 Julio 2020, 20:20";
    const plExp = "00:28:48";

    const paylinkUrl = "http://tppay/2543fd";

    const [sendSMS, setSendSMS] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);

    const { handleSubmit, control } = useForm({
        defaultValues: {
          email: "",
          phone: "",
          code: "",
        }
      });

    const submit = (data) => {
        console.log("submit", data);
        if (props.submit instanceof Function) {
            props.submit(data);
        }
    };

    return (
        <div>
            <Grid container spacing={2} style={{ width: '100%', marginLeft: '1px' }} className="box-margin-bottom-2">

                <Grid item xs={12} >
                    <ContentHeader
                        title={t("payment.show.title")}
                        subtitle={t("payment.show.subtitle")}
                        className="box-label-center box-margin-bottom-2"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2} className="box-border-curved">
                        <Grid container spacing={2} className="box-padding-bottom-2 box-padding-top-2">
                            <Grid item xs={12} sm={6} className="box-vertical box-align-center">
                                <QRCode url={paylinkUrl} size={200} />
                            </Grid>
                            <Grid item xs={12} sm={6} className="box-label-right ">
                                <Typography variant="body2" className="box-padding-right-2">
                                    {plDate}
                                </Typography>
                                <Typography variant="body2" className="box-padding-right-2">
                                    {plExp}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="note-bg" style={{ padding: "2rem" }}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} >
                                    <Typography variant="body5" className="gray-label box-label-bold"  >
                                        {t("payment.show.url")}:
                                </Typography>
                                </Grid>
                                <Grid item xs={12} >

                                </Grid>

                                <Grid item xs={12} >
                                    <ShareThis
                                        sharedUrl={paylinkUrl}
                                        className="gray-label box-label-bold"
                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sendSMS}
                                                onChange={(event) => setSendSMS(event.currentTarget.checked)}
                                                name="sendSMS"
                                                color="primary"
                                            />
                                        }
                                        label={t("payment.show.send.sms", { term: t("legal.terms"), policy: t("legal.policy") })}
                                    />
                                </Grid>
                                {sendSMS ? <Grid item xs={12} >
                                    <FormTextField
                                        control={control}
                                        name="code"
                                        size="medium"
                                        label={t("payment.show.code") + " *"}
                                        rules={{ required: t("error.required") }}
                                    />
                                </Grid> : null}
                                {sendSMS ? <Grid item xs={12} >
                                    <FormTextField
                                        control={control}
                                        name="phone"
                                        size="medium"
                                        label={t("payment.show.phone") + " *"}
                                        rules={{ required: t("error.required") }}
                                    />
                                </Grid> : null}
                                <Grid item xs={12} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sendEmail}
                                                onChange={(event) => setSendEmail(event.currentTarget.checked)}
                                                name="sendEmail"
                                                color="primary"
                                            />
                                        }
                                        label={t("payment.show.send.email", { term: t("legal.terms"), policy: t("legal.policy") })}
                                    />
                                </Grid>
                                {sendEmail ? <Grid item xs={12} >
                                    <FormTextField
                                        control={control}
                                        name="email"
                                        size="medium"
                                        label={t("payment.show.email") + " *"}
                                        rules={{ required: t("error.required") }}
                                    />
                                </Grid> : null}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {sendSMS || sendEmail ?
                <Button
                    variant="contained"
                    className="btn-full-width"
                    size="medium"
                    color="primary"
                    style={{ marginTop: "2rem" }}
                    onClick={handleSubmit(submit)}
                >
                    {t("payment.show.btn.next")}
                </Button>
                : null}
        </div>
    )
}

export default PaymentShow;
