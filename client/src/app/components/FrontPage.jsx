import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@mui/material";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import IMG_VISA from '../images/icon_visa.png';
import IMG_MASTERCARD from '../images/icon_mastercard.png';
import IMG_MAESTRO from '../images/icon_maestro.png';
import IMG_UNIONPLAY from '../images/icon_unionplay.png';
import IMG_DISCOVER from '../images/icon_discover.png';

import TwitterIcon from 'mdi-react/TwitterIcon';
import FacebookIcon from 'mdi-react/FacebookIcon';
import InstagramIcon from 'mdi-react/InstagramIcon';
import Login from '../../security/components/login';
import links from '../models/menu.link';
import MenuLink from './Menu/MenuLink';

import session from "../../security/services/Session";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '98%',
        margin: '0'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    layoutLeft: {
        height: '100vh',
        margin: '0'
    },
    layoutRight: {
        backgroundColor: '#4B59D3',
        minHeight: '2rem',
        height: '100vh',
        margin: '0'
    }
}));

function FrontPage() {
    const { t } = useTranslation();
    const cls = useStyles();
    const nav = useHistory();

    useEffect(() => {
        if (session.isValid()) {
            const from = session.get().from && session.get().from.pathname && 
                         session.get().from.pathname !== '/' ? session.get().from.pathname : "/home";
                         nav.push(from);
        }
    });

    return (
        <div className="home">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <div className="row" style={{ margin: '2rem' }}>
                        <Typography variant="h6" component="h4">
                            {t("front.name")}
                        </Typography>

                        <div className="box-horizontal" style={{ marginLeft: '3rem' }}>
                            <Typography style={{ marginRight: '3px', fontSize: '5px' }}>
                                {t("front.by")}
                            </Typography>
                            <Typography style={{ marginRight: '3px', fontSize: '10px' }}>
                                {t("front.company")}
                            </Typography>
                        </div>

                        <Typography variant="h4" mt='4rem'>
                            {t("front.title")}
                        </Typography>

                        <Typography variant="subtitle1" mt='1rem' mb='1rem'>
                            {t("front.subtitle")}
                        </Typography>

                        <Login />

                        <MenuLink data={links} />

                        <div className="logos box-horizontal">
                            <img src={IMG_VISA} alt="Visa" />
                            <img src={IMG_MASTERCARD} alt="Master Card" />
                            <img src={IMG_MAESTRO} alt="IMG_MAESTRO" />
                            <img src={IMG_UNIONPLAY} alt="IMG_UNIONPLAY" />
                            <img src={IMG_DISCOVER} alt="IMG_DISCOVER" />
                        </div>

                        <div className="socials">
                            <IconButton
                                title={t('Footer.social.twitter')}
                                href="https://twitter.com/tropipay"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                title={t('Footer.social.facebook')}
                                href="https://www.facebook.com/tropipay/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                title={t('Footer.social.instagram')}
                                href="https://www.instagram.com/tropipay"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5} className={cls.layoutRight}>
                </Grid>
            </Grid>
        </div>
    );
}

export default FrontPage;
