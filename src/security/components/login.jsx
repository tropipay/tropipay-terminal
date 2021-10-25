import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from '../services/auth';

function Login() {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        auth.signin(from).then(() => {
            history.replace(from);
        });
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