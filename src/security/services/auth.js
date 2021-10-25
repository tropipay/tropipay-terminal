import React, { useContext, createContext, useState } from "react";
import {
  Route,
  Redirect
} from "react-router-dom";


const url_tropipay = "https://sandbox.tropipay.me";
const oauth_authorize = url_tropipay + '/api/v2/access/authorize';
const oauth_token = url_tropipay + '/api/v2/access/token';
const client_id = "946cef5ecad81f282e20d9bbb712ec64";
const client_secret = "e25bbb41a2a2ed365e685e0edbb81162";
const redirect_uri = "http://localhost:3000/auth/callback";
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

  const signin = from => {
    return new Promise((resolve, reject) => {
    	setTimeout(() => {
        const user = { name: 'Tieso' };
        setUser(user);
        resolve(user);
      }, 2000);
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
  const code = params.get("code");
  const state = params.get("state");


  console.log('>>>>>>>', );
}