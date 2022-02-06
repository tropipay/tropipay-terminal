
import React, { useEffect } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import srvAuth from "../../security/services/AuthSlice";
import srvProfile from "../../security/services/ProfileSlice";
import ProvideAuth from '../../security/components/provide.auth';
import RoutePrivate from '../../security/components/route.private';
import MovementPage from '../../movement/components/MovementPage';
import PaymentPage from '../../payment/components/PaymentPage';
import ProfilePage from '../../profile/components/ProfilePage';
import FrontPage from "./FrontPage.jsx";
import HomePage from "./HomePage.jsx";
import Page from "./Page.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "./Message/Message";
import srvError from "../services/ErrorSlice";
import { useTranslation } from "react-i18next";
import { getSystemErrorMap } from "util";

export default function AppRoute() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errorId = useSelector(srvError.selector.code);
  
  useEffect(() => {
    dispatch(srvAuth.action.update());
    dispatch(srvProfile.action.update());
  });

  return (
    <ProvideAuth>
        <Switch>
            <RoutePrivate exact path="/home"> <Page>  <HomePage /> </Page> </RoutePrivate>
            <RoutePrivate exact path="/movement"> <Page> <MovementPage />  </Page> </RoutePrivate>
            <RoutePrivate exact path="/payment"> <Page> <PaymentPage /> </Page> </RoutePrivate>
            <RoutePrivate exact path="/profile"> <ProfilePage /> </RoutePrivate>

            <Route exact path='/' render={() => (<FrontPage />)}/>
            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
        <Message 
            style="error"
            message={traslate(errorId, t)} 
            onClose={()=>{
              console.log("message-onClose");
              dispatch(srvError.action.clean());
            }} 
            />
    </ProvideAuth>
  );
}

function traslate(id, t, scope='error', msgDefault="error.internal"){
  if(!id || id === '') return '';
  const msgId = scope+"."+id;
  return t(msgId) !== msgId ? t(msgId) : t(msgDefault)
}