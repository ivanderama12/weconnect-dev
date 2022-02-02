import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
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

    function updateemail(password) {
        const credential = EmailAuthProvider.credential(currentUser.email, password)
        console.log(currentUser.email, '1123123')
        reauthenticateWithCredential(currentUser, credential).then(() => {
            return true
        }).catch(() => {
            return false
        })
        updateEmail(currentUser, 'change@test.com').catch(()=> {
            console.log()
        })
    }

    function logout() {
        setUserType()
        signOut(auth)
    }

    function setisagency(param) {
        return setIsAgency(param);
    }

    function setuserdetails(details) {
        setUserDetails(details)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
            var details
            if (!details && currentUser)
                Promise.all([results.get('/users/serviceagency/' + user.uid + '.json'), results.get('/users/establishment/' + user.uid + '.json')])
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
        updateemail,
        setisagency,
        setuserdetails,
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
