import React, { useContext, createContext, useState } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import db from './localdb';

const qs = require('qs');
const url_terminal = "http://localhost:3002";
const url_tropipay = "http://localhost:3000";
const oauth_authorize = url_tropipay + '/api/v2/access/authorize';
const oauth_token = url_tropipay + '/api/v2/access/token';
const redirect_uri = url_terminal + "/auth/callback";
const client_id = "1b125cefa4e6aa5fc044a06190953eac";
const client_secret = "6fdd1a8b146b22be1057d38f2b672e7d";
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
    const param = qs.stringify({
      response_type: "code",
      client_id,
      client_secret,
      redirect_uri,
      code_challenge,
      code_challenge_method,
      state,
      scope
    });
    const url = oauth_authorize + "?" + param;
    return new Promise((resolve, reject) => {
      resolve(url);
    });
  };

  const signout = from => {
    return new Promise((resolve, reject) => {
    	setTimeout(() => {
        setUser(null);
        resolve(null);
      }, 2000);
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
  const param = {
      grant_type: "authorization_code",
      code: req_code,
      client_id,
      client_secret,
      redirect_uri,
      code_verifier,
      scope
  };
  //... save authorization code
  console.log('>>>>>>>', oauth_token);
  fetch(oauth_token, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(param), 
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

}