import React, { useEffect } from 'react';

//import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

function MovementPage() {
  //const dispatch = useDispatch();
  const count = 1; //useSelector(selectCount);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="Demo">
        {t("demo.title", { test: 'movement' })}
    </div>
  );
}

export default MovementPage;
