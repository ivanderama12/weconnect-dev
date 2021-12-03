import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

import usericon from '../../images/icons/UserIcon.svg'
import msgicon from '../../images/icons/MessageIcon.svg'
import agreeicon from '../../images/icons/AgreementIcon.svg'
import logouticon from '../../images/icons/LogoutIcon.svg'

const UserDropdown = () => {

    const { logout, setisagency, userDetails, currentUser, userType } = useAuth()
    const history = useHistory()
    const type = userType === 'establishment' ? '/' : '/serviceagency/'


    function handleLogout() {
        setisagency(false)
        logout()
        history.push('/')
    }

    return (
        <div>
            <Dropdown >
                <Dropdown.Toggle variant='light'>{userDetails && userDetails.companyName} </Dropdown.Toggle>
                <Dropdown.Menu align='end'>
                    <Dropdown.Item as={Link} to={type + 'account'}>
                        <Image className='menu-icon me-1' src={usericon} alt='users' />
                        Manage Account
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={type + 'messages'} >
                        <Image className='menu-icon me-1' src={msgicon} alt='msgs' />
                        Messages
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={type + 'agreements'} >
                        <Image className='menu-icon me-1' src={agreeicon} alt='agreements' />
                        View Agreements
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogout()}>
                        <Image className='menu-icon me-1' src={logouticon} alt='logout' />
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default UserDropdown
