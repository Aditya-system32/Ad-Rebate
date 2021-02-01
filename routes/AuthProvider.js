import React, { createContext, useState } from "react";
import { app as firebase } from "../firebases";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState();
  const [bannerData, setBannerData] = useState();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        bannerData,
        setBannerData,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
