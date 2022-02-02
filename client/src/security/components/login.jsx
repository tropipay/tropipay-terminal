import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // useHistory, 
import IconUrl from '../../app/images/favicon-96x96.png'

import db from "../services/localdb";

function Login() {
    const url = ""; //"http://localhost:3005";
    const { t } = useTranslation();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        db.set({ from }, "session");
        window.location.href = url + "/api/v1/security/user/connected_view";
    };

    return (
        <Button
            onClick={login} 
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#232C53' }}
            startIcon={<img src={IconUrl} style={{ width: "2rem" }} alt="" />}
        >
            {t("home.connect")}
        </Button>
    );
}

export default Login;