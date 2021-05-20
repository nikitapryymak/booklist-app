import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export default function AuthProvider(props) {

    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    function signup(email, password) { // returns a promise so we can handle errors in components.
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) { 
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() { 
        return auth.signOut();
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }
    function setName(displayName) {
        setCurrentUser(prev => ({
            ...prev,
            displayName
        }));
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => { // sets up listener to firebase auth state, takes in new user as param. needs to load.
            console.log('Auth Context', user);
            if (!user) { setCurrentUser(null); setUserLoading(false); return; } 
            
            setCurrentUser({ uid: user.uid, displayName: user.displayName });
            setUserLoading(false);
        });
        return unsub;
    }, []); // only run once-- when comp renders

    const value = { 
        currentUser,
        signup, 
        login, 
        logout, 
        resetPassword,
        setName
    }
    return (
        <AuthContext.Provider value={value}>
            {/* only render children once user is loaded (either null or an obj) */}
            {!userLoading && props.children} 
        </AuthContext.Provider>
    )
}