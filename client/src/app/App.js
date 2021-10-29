
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import "./App.scss";
import './services/lang';

import store from './stores/AppStore';
import AppRoute from './components/AppRoute';

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <AppRoute />
        </Provider>
      </BrowserRouter>
  );
}

export default App;

