import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';

import IMG_VISA from '../images/icon_visa.png';
import IMG_MASTERCARD from '../images/icon_mastercard.png';
import IMG_MAESTRO from '../images/icon_maestro.png';
import IMG_UNIONPLAY from '../images/icon_unionplay.png';
import IMG_DISCOVER from '../images/icon_discover.png'

import TwitterIcon from 'mdi-react/TwitterIcon';
import FacebookIcon from 'mdi-react/FacebookIcon';
import InstagramIcon from 'mdi-react/InstagramIcon';
import Login from '../../security/components/login';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '98%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  layoutLeft: { },
  layoutRight: {
    backgroundColor: '#4B59D3',
    minHeight: '20rem'
  }
}));

const links = [
    {
        label: "legal.copyright",
        to: "#"
    },
    {
        label: "legal.policy",
        to: "/privacy"
    }, 
    {
        label: "legal.terms",
        to: "/terms"
    }
]

function Home() {
    const cls = useStyles();
    const { t } = useTranslation();
    return (
        <div >
            <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
                <div className="row" style={{margin: '2rem'}}>
                    <Typography variant="h4" component="h4">
                        {t("home.name")}
                    </Typography>
                    <Typography variant="subtitle1" component="h4">
                        {t("home.company")}
                    </Typography>
                    
                    <Typography variant="h3" component="h3">
                        {t("home.title")}
                    </Typography>
                    <Typography variant="subtitle1" component="h3">
                        {t("home.subtitle")}
                    </Typography>


                    <Login />

                    <ul className="footerMenu">
                        {links.map((item, i) => (
                            <li key={i} className="menuItem my-2">
                                <Link to={item.to}>{t(item.label)}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="logos">
                        <img src={IMG_VISA} alt="Visa"/>
                        <img src={IMG_MASTERCARD} alt="Master Card"/>
                        <img src={IMG_MAESTRO} alt="IMG_MAESTRO"/>
                        <img src={IMG_UNIONPLAY} alt="IMG_UNIONPLAY"/>
                        <img src={IMG_DISCOVER} alt="IMG_DISCOVER"/>
                    </div>

                    <div className="socials">
                        <IconButton
                            title={t('Footer.social.twitter')}
                            href="https://twitter.com/tropipay"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TwitterIcon/>
                        </IconButton>
                        <IconButton
                            title={t('Footer.social.facebook')}
                            href="https://www.facebook.com/tropipay/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon/>
                        </IconButton>
                        <IconButton
                            title={t('Footer.social.instagram')}
                            href="https://www.instagram.com/tropipay"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon/>
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

export default Home;
