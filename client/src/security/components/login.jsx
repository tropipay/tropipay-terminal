import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // useHistory, 

import db from "../services/localdb";

function Login() {
    const { t } = useTranslation();
    /*const history = useHistory();*/
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        db.set({ from }, "session");
        window.location.href = "/auth/session";
        /*return auth.signin(history, from).then((url) => {
            window.location.href = url;
        });*/
    };

    return (
        <div className="Login">
            <Button variant="contained" onClick={login} >
                {t("security.login.title")}
            </Button>
        </div>
    );
}

export default Login;