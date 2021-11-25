import React, {useState} from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ContentHeader from '../../app/components/ContentHeader';

import Grid from '@material-ui/core/Grid';

function PaymentResume(props) {
    const { t } = useTranslation();

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
                />
            </Grid>

            <Grid item xs={12} >
                AAAA
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
                    label="Primary"
                />
            </Grid>

            <Grid item xs={12} >
                <Button
                    variant="contained"
                    className="btn-full-width"
                    size="medium"
                    color="primary"
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
