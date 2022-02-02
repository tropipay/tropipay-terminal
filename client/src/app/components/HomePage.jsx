import React, { useEffect } from "react";

//import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

function HomePage() {
  const { t } = useTranslation();
  const nav = useHistory();

  useEffect(() => {
    document.title = `You clicked times`;
  });

  return (
    <div className="Demo">
      {t("demo.title", { test: "HomePage" })}
      <Button
        variant="contained"
        className="btn-full-width"
        size="large"
        style={{ marginTop: "2rem" }}
        onClick={() => nav.push("/payment")}
        color="secondary"
      >
        {t("payment.btn.back")}
      </Button>
    </div>
  );
}

export default HomePage;
