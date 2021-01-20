import React,{createContext, useState} from 'react'
import * as firebase from 'firebase';
import {firebaseConfig} from '../firebases'
firebase.initializeApp(firebaseConfig);

export const AuthContext = createContext();

export const AuthProvider = ({children,navigation}) => {
    const [user,setUser] = useState(false);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email,password) =>{
                    try{
                        await firebase.auth().signInWithEmailAndPassword(email, password)
                    }catch(e){
                        console.log(e)
                    }
                },
                register: async (email, password) => {
                    try{
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                    }catch(e){
                        console.log(e)
                    }
                },
                logout: async () => {
                    try{
                        await firebase.auth().signOut(); 
                    }catch(e){
                        console.log(e)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}