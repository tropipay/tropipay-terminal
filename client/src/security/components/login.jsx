import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // useHistory, 
import IconUrl from '../../app/images/favicon-96x96.png'

import session from "../services/Session";

function Login() {
    const url = ""; //"http://localhost:3005";
    const { t } = useTranslation();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        session.set({ from });
        window.location.href = url + "/api/v1/security/oauth/connect";
    };

    return (
        <Button
            onClick={login} 
            variant="contained"
            color="primary"
            size="large"
            style={{ backgroundColor: '#232C53' }}
            startIcon={<img src={IconUrl} style={{ width: "2rem" }} alt="" />}
        >
            {t("front.connect")}
        </Button>
    );
}

export default Login;