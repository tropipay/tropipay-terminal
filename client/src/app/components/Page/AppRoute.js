
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import srvAuth from "../../../security/services/AuthSlice";
import srvProfile from "../../../profile/services/ProfileSlice";
import ProvideAuth from '../../../security/components/provide.auth';
import RoutePrivate from '../../../security/components/route.private';
import MovementPage from '../../../movement/components/MovementPage';
import PaymentPage from '../../../payment/components/PaymentPage';
import FrontPage from "./FrontPage.jsx";
import HomePage from "./HomePage.jsx";
import Page from "./Page.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Message/Message";
import srvMessage from "../../services/MessageSlice";
import { useTranslation } from "react-i18next";

export default function AppRoute() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const msgId = useSelector(srvMessage.selector.code);
  const msgType = useSelector(srvMessage.selector.type);
  
  useEffect(() => {
    dispatch(srvAuth.action.update());
    dispatch(srvProfile.action.update());
  });

  return (
    <ProvideAuth>
        <Switch>
            <RoutePrivate exact path="/home">     <Page> <HomePage />       </Page> </RoutePrivate>
            <RoutePrivate exact path="/movement"> <Page> <MovementPage />   </Page> </RoutePrivate>
            <RoutePrivate exact path="/payment">  <Page> <PaymentPage />    </Page> </RoutePrivate>

            <Route exact path='/' render={() => (<FrontPage />)}/>
            <Route path='*' exact={true} render={() => (<Redirect to="/"/>)}/>
        </Switch>
        <Message 
            cls={msgType || ""}
            message={traslate(msgId, t, msgType)} 
            onClose={()=>{
              dispatch(srvMessage.action.clean());
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