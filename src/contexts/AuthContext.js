import { createContext, useEffect, useState } from "react";
import db, { auth } from "../firebase";

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

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => { // sets up listener to firebase auth state, takes in new user as param. needs to load.
            console.log('Auth Context', user);
            if (!user) { setCurrentUser(null); setUserLoading(false); return; } 
            async function getName() {
                setUserLoading(true);
                const doc = await db.collection('users').doc(user.uid).get();
                setCurrentUser({ uid: user.uid, ...doc.data() });
                setUserLoading(false);
            }
            getName();
        });
        return unsub;
    }, []); // only run once-- when comp renders

    const value = { 
        currentUser,
        signup, 
        login, 
        logout, 
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {/* only render children once user is loaded (either null or an obj) */}
            {!userLoading && props.children} 
        </AuthContext.Provider>
    )
}