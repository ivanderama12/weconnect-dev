import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from './firebase'
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isAgency, setIsAgency] = useState(false)

    function signup(email, password, contactPerson) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(function (result) {
                return updateProfile(result.user, {
                    displayName: contactPerson
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function reset(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout() {
        return signOut(auth)
    }

    function setisagency(param) {
        return setIsAgency(param);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        isAgency,
        currentUser,
        setisagency,
        signup,
        login,
        logout,
        reset
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
