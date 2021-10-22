import Button from "@mui/material/Button";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, selectCount } from './LoginSlice';
import { useTranslation } from "react-i18next";

function Login() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="Login">
      <Button variant="contained" onClick={() => dispatch(increment())} >
        {t("login.title", {test: 'TTT'})}
      </Button>
    </div>
  );
}

export default Login;
