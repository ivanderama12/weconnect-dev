import React from 'react'
import { useAuth } from '../../../../AuthContext'

const Profile = () => {
    const { userDetails } = useAuth()
    return (
        <div>
            <h3>Profile</h3>
            {userDetails.userName}
            <br />
            {userDetails.userTitle}
            <br />
            {userDetails.companyName}
            <br />
            {userDetails.contactNumber}
        </div>
    )
}

export default Profile
