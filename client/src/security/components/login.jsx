import Button from "@mui/material/Button";
import React from 'react';

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // useHistory, 

import db from "../services/Localdb";

function Login() {
    const url = "http://localhost:3005";
    const { t } = useTranslation();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const login = () => {
        db.set({ from }, "session");
        window.location.href = url + "/api/v1/security/user/connected_view";
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