
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import "./App.scss";
import './services/lang';

import AppStore from './models/AppStore';
import AppRoute from './components/Page/AppRoute';

function App() {
  return (
      <BrowserRouter>
        <Provider store={AppStore}>
          <AppRoute />
        </Provider>
      </BrowserRouter>
  );
}

export default App;

