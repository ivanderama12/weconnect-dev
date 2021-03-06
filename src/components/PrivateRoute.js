import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { userType, currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return userType !== 'serviceagency' ? <Component {...props} /> : <Redirect to="/serviceagency/dashboard" />
            }}
        >

        </Route>
    )
}
