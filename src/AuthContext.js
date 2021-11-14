import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
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

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
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

        // if (!loaded && currentUser) {
        //     results.get('/users/serviceagency/' + currentUser.uid + '.json')
        //         .then(function (response) {
        //             setUserDetails(response.data)
        //             if (userDetails) {
        //                 setFound = true
        //                 setUserType('serviceagency')
        //             }
        //         }).catch(function (error) {
        //             console.log(error)
        //         })
        //     if (!found) {
        //         results.get('/users/establishment/' + currentUser.uid + '.json')
        //             .then(function (response) {
        //                 setUserDetails(response.data)
        //                 setUserType('establishment')
        //             }).catch(function (error) {
        //                 console.log(error)
        //             })
        //     }
        //     console.log(currentUser)
        // }


        return unsubscribe
    }, [currentUser])



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
