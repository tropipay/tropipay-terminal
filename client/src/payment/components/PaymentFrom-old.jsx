import React from 'react';

import { useTranslation } from "react-i18next";
import {SelectValidator, TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon';

import lang from '../../app/services/lang';


function PaymentFrom(props) {
    const { t } = useTranslation();

    const getMinimumAmount = () => {
        /*let minimumAmount = this.state.service && this.state.service.min ? this.state.service.min / 100 : 16;
        if (this.state.currency && this.state.currency === 'USD' && this.props.rate) {
            minimumAmount = Math.ceil(minimumAmount * this.props.rate);
        }
        return minimumAmount;*/
        return 16;
    };

    const handleSuccess = () => {
        //this.props.actionSuccess(this.state);
    };

    const handleSelectChange = () => {
        
    } 

    const _handleFieldChange = () => {
        
    } 

    const reasonTypes = {
        OTHER: 9
    };

    const clientTypes = {
        PHYSICAL: 1,
        LEGAL: 2
    }

    const locales = lang.getSupported();
    const minimumAmount = getMinimumAmount();
    const reasonId = '';
    const expirationDays = 1;
    const advanced = false;

    return (
        <div className="Demo">
            {t("demo.title", { test: 'PaymentFrom' })}

            <div>
            <ValidatorForm
                    ref="form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSuccess();
                    }}
                    onError={errors => console.debug(errors)}
                >
                    <div className="login-form mt1 col-xs-12">
                        <div className="text-center">
                            <TextValidator
                                name="concept"
                                label={t('payment.from.concept.label')}
                                variant="outlined"
                                placeholder={t('payment.from.concept.placeholder')}
                                margin="normal"
                                value={this.state.concept}
                                onChange={_handleFieldChange}
                                fullWidth
                                required={true}
                                validators={['required']}
                                errorMessages={[t('error.required')]}
                                className="mb2"
                            />
                        </div>
                        <div className="text-center">
                            <TextValidator
                                name="description"
                                label={t('payment.from.description.label')}
                                variant="outlined"
                                placeholder={t('payment.from.description.placeholder')}
                                margin="normal"
                                value={this.state.description}
                                onChange={_handleFieldChange}
                                fullWidth
                                multiline
                                rows="3"
                                required={true}
                                validators={['required']}
                                errorMessages={[t('error.required')]}
                                className="mb2"
                            />
                        </div>
                        <div className="row">
                            <div className="col-8 text-left pr-1">
                                <TextValidator
                                    name="amount"
                                    placeholder={t('payment.from.amount.placeholder')}
                                    label={t('payment.from.amount.label')}
                                    variant="outlined"
                                    value={this.state.amount}
                                    margin="normal"
                                    //onChange={_handleFieldChange}
                                    required={true}
                                    disabled={this.state.action === "edit"}
                                    validators={['required', "matchRegexp:^\\d+([,\\.]\\d{1,2})?$", `minNumber:${minimumAmount}`]}
                                    errorMessages={[t('error.required'), t('error.amount'), t("error.minCryptoAmount", minimumAmount)]}
                                    fullWidth
                                    className="mb2"
                                />
                            </div>
                            <div className="col-4 text-left pl-2">
                                <SelectValidator
                                    name="currency"
                                    label={t('payment.from.currency')}
                                    variant="outlined"
                                    select
                                    disabled={this.state.action === "edit"}
                                    value={this.state.currency}
                                    onChange={handleSelectChange('currency')}
                                    required={true}
                                    fullWidth
                                    className=""
                                    margin="normal"
                                    validators={['required']}
                                    errorMessages={[t('error.required')]}
                                >
                                    <MenuItem disabled={process.env.REACT_APP_DISABLE_USD === "true"}
                                              value={'USD'}>USD</MenuItem>
                                    <MenuItem disabled={process.env.REACT_APP_DISABLE_EUR === "true"}
                                              value={'EUR'}>EUR</MenuItem>
                                </SelectValidator>
                            </div>
                        </div>
                        <div className="text-center">
                            <SelectValidator
                                name="reasonId"
                                label={t('payment.from.reason')}
                                select
                                value={reasonId}
                                onChange={handleSelectChange('reasonId')}
                                required={true}
                                fullWidth
                                margin="normal"
                                className="text-left"
                                variant="outlined"
                                validators={['required']}
                                errorMessages={[t('error.required')]}
                            >
                                {props.reasons.map((item, i) =>
                                    <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                )}
                            </SelectValidator>
                        </div>
                        {reasonId === reasonTypes.OTHER ?
                            <div className="text-center">
                                <TextValidator
                                    name="reasonDes"
                                    label={t('payment.from.reasonDes')}
                                    variant="outlined"
                                    placeholder={t('payment.from.reasonDes')}
                                    margin="normal"
                                    value={this.state.reasonDes}
                                    onChange={_handleFieldChange}
                                    fullWidth
                                    required={true}
                                    validators={['required']}
                                    errorMessages={[t('error.required')]}
                                    className="mb2"
                                /></div>
                            : null}
                        <div className="text-left">
                            <SelectValidator
                                name="lang"
                                label={t('payment.from.lang')}
                                variant="outlined"
                                select
                                value={this.state.lang}
                                onChange={handleSelectChange('lang')}
                                required={true}
                                fullWidth
                                margin="normal"
                                validators={['required']}
                                errorMessages={[t('error.required')]}
                            >
                                {locales.map(item => item.active ?
                                    <MenuItem key={item.lang} value={item.lang}>{item.label}</MenuItem> : null)}
                            </SelectValidator>
                        </div>
                        <div className="text-center">
                            <TextValidator
                                name="expirationDate"
                                type="date"
                                label={t('payment.from.expirationDate')}
                                variant="outlined"
                                value={this.state.expirationDate}
                                margin="normal"
                                onChange={_handleFieldChange}
                                fullWidth
                                className="mb2 date-input"
                                InputLabelProps={{shrink: true}}
                                validators={['isSameOrGreaterThanCurrentDate']}
                                errorMessages={[t('error.isSameOrGreaterThanCurrentDate')]}
                            />
                        </div>
                        <div style={{marginBottom: '-1rem', marginTop: '.2rem'}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="favorite"
                                        color="primary"
                                        checked={this.state.favorite}
                                        onChange={_handleFieldChange}
                                        value="favorite"
                                        disabled={this.state.action === "edit"}
                                    />
                                }
                                label={t('payment.from.favorite')}
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="singleUse"
                                    color="primary"
                                    checked={this.state.singleUse}
                                    onChange={_handleFieldChange}
                                    value="singleUse"
                                />
                            }
                            label={t('payment.from.singleUse')}
                        />
                        {this.state.singleUse ?
                            <div>
                                <div className="text-center">
                                    <TextValidator
                                        name="reference"
                                        label={t('payment.from.reference.label')}
                                        variant="outlined"
                                        placeholder={t('payment.from.reference.label')}
                                        margin="normal"
                                        value={this.state.reference}
                                        onChange={_handleFieldChange}
                                        fullWidth
                                        display={this.state.singleUse ? "true" : "false"}
                                        required={true}
                                        validators={['required']}
                                        errorMessages={[t('error.required')]}
                                        className="mb2"
                                    />
                                </div>
                                {props.user.clientTypeId === clientTypes.LEGAL ?
                                    <div className="text-center">
                                        <TextValidator
                                            name="serviceDate"
                                            type="date"
                                            label={t('payment.from.serviceDate')}
                                            variant="outlined"
                                            value={this.state.serviceDate}
                                            margin="normal"
                                            onChange={_handleFieldChange}
                                            fullWidth
                                            className="mb2"
                                            InputLabelProps={{shrink: true}}
                                            required={true}
                                            validators={['required', 'isSameOrGreaterThanCurrentDate']}
                                            errorMessages={[t('error.required'), t('error.isSameOrGreaterThanCurrentDate')]}
                                        />
                                    </div> : null}
                            </div> : null}
                        <div className="text-center mt-3" style={{display: 'none'}}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="py-1"
                                >
                                    {t('payment.from.advanced')}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="text-center">
                                        <TextValidator
                                            name="urlSuccess"
                                            label={t('payment.from.urlSuccess.label')}
                                            variant="outlined"
                                            placeholder={t('payment.from.urlSuccess.placeholder')}
                                            margin="normal"
                                            value={this.state.urlSuccess}
                                            onChange={_handleFieldChange}
                                            fullWidth
                                            className="mb2"
                                            validators={["matchRegexp:(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"]}
                                            errorMessages={[t('error.url')]}
                                        />
                                        <TextValidator
                                            name="urlFailed"
                                            label={t('payment.from.urlFailed.label')}
                                            variant="outlined"
                                            placeholder={t('payment.from.urlFailed.placeholder')}
                                            margin="normal"
                                            value={this.state.urlFailed}
                                            onChange={_handleFieldChange}
                                            fullWidth
                                            className="mb2"
                                            validators={["matchRegexp:(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"]}
                                            errorMessages={[t('error.url')]}
                                        />
                                        <TextValidator
                                            name="urlNotification"
                                            label={t('payment.from.urlNotification.label')}
                                            variant="outlined"
                                            placeholder={t('payment.from.urlNotification.placeholder')}
                                            margin="normal"
                                            value={this.state.urlNotification}
                                            onChange={_handleFieldChange}
                                            fullWidth
                                            className="mb2"
                                            validators={["matchRegexp:(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"]}
                                            errorMessages={[t('error.url')]}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="text-right">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={this.state.amount <= 0}
                                className="mt-4 btn-full-width"
                                size="large"
                                color="primary">
                                {t('BookingChargeForm.btnNext')}
                            </Button>
                        </div>
                        <div className="text-right">
                            <Button
                                variant="contained"
                                onClick={this._handleClose}
                                className="mt-4 btn-full-width"
                                size="large"
                                color="secondary">
                                {t('BookingChargeForm.btnCancel')}
                            </Button>
                        </div>
                    </div>
                </ValidatorForm>
            </div>
        </div>
    );
}

export default PaymentFrom;
