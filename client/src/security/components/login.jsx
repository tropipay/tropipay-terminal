import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import IconUrl from '../../app/images/terminal-boton.png';

import session from "../services/Session";

function Login() {
    const { t } = useTranslation();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        session.set({ from });
        window.location.href = "/api/v1/security/oauth/connect";
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