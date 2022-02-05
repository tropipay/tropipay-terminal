import React, { useContext, createContext, useState } from "react";
import ses from "../services/session";

const AuthContext = createContext();

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// ... Constext Selector
export function useAuth() {
  return useContext(AuthContext);
}

// ... Constext Handler used for useAuth
export function useProvideAuth() {
  const [session, setSession] = useState(null);

  const signIn = (history, from) => {
    return new Promise((resolve, reject) => {
      resolve(from);
    });
  };

  const signOut = (from) => {
    return new Promise((resolve, reject) => {
      ses.del();
      setSession(null);
      resolve(null);
    });
  };

  return {
    session,
    signIn,
    signOut
  };
}
