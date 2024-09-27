import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
    console.log("Me logue")
  }

  const logout = () => {
    console.log("mE DESLOGUE");
    setIsAuthenticated(false);
    setUser("");
  }

  return (
    <userContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated,login,logout }}>
      {children}
    </userContext.Provider>
  );
};