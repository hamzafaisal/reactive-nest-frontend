import React, { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setcurrentUser] = useState({});

  const logout = () => {
    setcurrentUser({});
  };

  const login = (user) => {
    setcurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, login }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
