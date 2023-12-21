import React, { useState, createContext } from "react";
import { login, signup } from "../api/auth-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
    setIsAuthenticated(true);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result.token) {
        setToken(result.token);
        setUserName(username);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle errors (e.g., show error message to user)
    }
  };

  const register = async (username, password) => {
    try {
      const result = await signup(username, password);
      return result.code === 201;
    } catch (error) {
      console.error("Registration error:", error);
      // Handle errors
      return false;
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        userName,
        authenticate,
        register,
        signout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
