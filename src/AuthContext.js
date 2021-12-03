import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from './firebase'
import results from './results'
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isAgency, setIsAgency] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [userType, setUserType] = useState()

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function reset(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateprofile(name, url) {
        return updateProfile(currentUser, {
            displayName: name,
            photoURL: url
        })
    }

    function logout() {
        setUserType()
        signOut(auth)
    }

    function setisagency(param) {
        return setIsAgency(param);
    }

    function getUserAgency(uid) {
        return results.get('/users/serviceagency/' + uid + '.json')
    }

    function getUserEstablishment(uid) {
        return results.get('/users/establishment/' + uid + '.json')
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
            var details
            if (!details && currentUser)
                Promise.all([getUserAgency(user.uid), getUserEstablishment(user.uid)])
                    .then(function (results) {
                        const sa = results[0]
                        const est = results[1]
                        if (sa.data !== null) {
                            details = sa.data
                            setUserDetails(details)
                            setUserType('serviceagency')
                        } else {
                            details = est.data
                            setUserDetails(details)
                            setUserType('establishment')
                        }
                    })
        })

        return unsubscribe
    }, [currentUser])



    const value = {
        isAgency,
        currentUser,
        userDetails,
        userType,
        setisagency,
        signup,
        login,
        logout,
        updateprofile,
        reset
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
