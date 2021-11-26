import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel } from "@material-ui/core";
import ContentHeader from '../../app/components/ContentHeader';
import QRCode from '../../app/components/QRcode/QRCode';
import ShareThis from '../../app/components/ShareThis/ShareThis';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';

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

    const submit = () => {
        if (props.submit instanceof Function) {
            props.submit();
        }
    };

    return (
        <Grid container spacing={2} style={{ width: '100%', marginLeft: '1px' }}  className="box-margin-bottom-2">

            <Grid item xs={12} >
                <ContentHeader
                    title={t("payment.show.title")}
                    subtitle={t("payment.show.subtitle")}
                    className="box-label-center"
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
                    <Grid item xs={12} className="note-bg" style={{ padding: "2rem"}}>
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PaymentShow;
