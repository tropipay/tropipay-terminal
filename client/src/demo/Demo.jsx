import Button from "@mui/material/Button";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, selectCount } from './DemoSlice';
import { useTranslation } from "react-i18next";
import { loadProfile } from "../security/services/AuthSlice";

function Demo() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    dispatch(loadProfile());
    console.log("Demo.jsx", "useEffect - dispatch(loadProfile())");
  });

  return (
    <div className="Demo">
      <Button variant="contained" onClick={() => dispatch(increment())} >
        {t("demo.title", { test: 'TTT' })}
      </Button>
    </div>
  );
}

export default Demo;
