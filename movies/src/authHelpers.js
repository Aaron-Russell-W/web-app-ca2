import React, { createContext, useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from './firebase-config'; 
import { Navigate } from 'react-router-dom';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    
    return <Navigate to="/" />;
  }

  return children;
};