import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import results from '../../results'

import usericon from '../../images/icons/UserIcon.svg'
import msgicon from '../../images/icons/MessageIcon.svg'
import agreeicon from '../../images/icons/AgreementIcon.svg'
import logouticon from '../../images/icons/LogoutIcon.svg'

const UserDropdown = (props) => {

    const uid = props.uid
    const { logout, setisagency } = useAuth()
    const [userName, setUserName] = useState()
    const history = useHistory()

    useEffect(() => {
        console.log(uid)

        Promise.all([getUserAgency(), getUserEstablishment()])
            .then(function (results) {

                const sa = results[0]
                const est = results[1]
                if (sa.data !== null) {
                    const name = sa.data.userName
                    setUserName(name)
                } else {
                    const name = est.data.userName
                    setUserName(name)
                }
                console.log(userName)
            });

    }, [userName])

    function handleLogout() {
        setisagency(false)
        logout()
        history.push('/')
    }

    function getUserAgency() {
        return results.get('/users/serviceagency/' + uid + '.json')
    }

    function getUserEstablishment() {
        return results.get('/users/establishment/' + uid + '.json')
    }

    return (
        <div>
            <Dropdown >
                <Dropdown.Toggle variant='light' >
                    {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu align='end'>
                    <Dropdown.Item as={Link} to={'profile'}>
                        <Image className='menu-icon' src={usericon} alt='users' />
                        Manage Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to='messages' >
                        < img className='menu-icon' src={msgicon} alt='msgs' />
                        Messages
                    </Dropdown.Item> <Dropdown.Item as={Link}
                        to='/admin/agreements' >
                        <Image className='menu-icon' src={agreeicon} alt='agreements' />
                        View Agreements
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogout()}>
                        <Image className='menu-icon' src={logouticon} alt='logout' />
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default UserDropdown
