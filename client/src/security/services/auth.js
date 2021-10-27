import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import db from './localdb';
const qs = require('qs');
const axios = require('axios');

const url_terminal = "http://localhost:3002";
const url_tropipay = "http://localhost:3001";
const url_login = url_terminal + '/api/v1/security/user/connected_view';

const oauth_authorize = url_tropipay + '/api/v2/access/authorize';
const oauth_token = url_tropipay + '/api/v2/access/token';
const redirect_uri = url_terminal + "/auth/callback";

const client_id = "5d6fd52d1796bd41632099cb5444b7f6";
const client_secret = "a0a59684bac288ce15a100ee8d84a16b";
const scope = "ALLOW_GET_BALANCE";
const state = "abcd-1234";
const code_verifier = "1234-abcd-1234";
const code_challenge = "N2_wPQ7X9iP5bKXcw05rqHw1S7OwFuU4Nqi6ccr_LEs";
const code_challenge_method = "S256";

/** For more details on
 * `AuthContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// handler login/logout from useAuth
export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (history, from) => {
    db.set('session', JSON.stringify({ from }));
    return new Promise((resolve, reject) => {
      resolve(url_login);
    });
  };

  const signout = from => {
    return new Promise((resolve, reject) => {
      db.del('session');
      setUser(null);
      resolve(null);
    });
  };

  return {
    user,
    signin,
    signout
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function RoutePrivate({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export function authorizationCode ({ location }){
  const params = new URLSearchParams(location.search);
  const req_code = params.get("code");
  const req_state = params.get("state");
  console.log('AUTH_RES: ', req_code, req_state);

  //... verify the state value
  if (req_state !== state) {
      console.log('NOT secure, the state value not match');
  }
  //... confifure options for get authorization code
  const options = {
      grant_type: "authorization_code",
      code: req_code,
      client_id,
      client_secret,
      redirect_uri,
      code_verifier,
      scope
  };

  //... save authorization code
  fetch(oauth_token, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(options), 
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => {
    //const data = res.json();
    console.log('<<<<<<<<<<<', res);
    if(res.body){
      db.set({
        name: 'tisto'
      });
    }    
  })
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));

  /*axios({
    method: 'post',
    url: oauth_token,
    params: options,
    mode: 'no-cors',
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'

    }
  }).then(token => {
    console.log("**************", token);
  });*/
}