import React, { useState, useEffect } from 'react'
import { Navbar as NavB, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../../images/WeConnect-Logo.svg'

import { useAuth } from '../../AuthContext'
import UserDropdown from './UserDropdown'

const Navbar = () => {

    const history = useHistory()
    const { currentUser, setisagency, isAgency, userType } = useAuth()
    const [isServiceAgency, setIsServiceAgency] = useState(false)

    useEffect(() => {
        setIsServiceAgency(isAgency)
    }, [isAgency]);

    function handleButtonClick() {
        if (!isServiceAgency) {
            setisagency(true)
            history.push('/serviceagency/login')
        } else {
            setisagency(false)
            history.push('/')
        }
    }

    function getLink() {
        if (!userType) {
            return isAgency ? '/serviceagency/login' : '/'
        } else {
            return userType === 'serviceagency' ? "/serviceagency/dashboard" : "/dashboard"
        }
    }

    return (
        <div>
            <NavB className="px-2 py-1" bg="light" expand="md" >
                <NavB.Brand as={Link} to={getLink()}>
                    <img src={logo} alt='weconnect-logo' />
                </NavB.Brand>
                <NavB.Toggle aria-controls="basic-navbar-nav" />

                <NavB.Collapse className="justify-content-end" id="basic-navbar-nav">
                    {!currentUser && <Nav style={{ gap: '10px' }}>
                        <Nav.Link
                            as={Link}
                            to={isAgency ? '/serviceagency/register' : '/register'}
                        >
                            Register
                        </Nav.Link>

                        <Nav.Link as={Link} to={isAgency ? '/serviceagency/login' : '/login'}>
                            Login
                        </Nav.Link>
                        <Button
                            variant={isAgency ? 'danger' : 'outline-danger'}
                            onClick={handleButtonClick}
                            style={{ width: '180px' }}>
                            {isAgency ? 'For Establishments' : 'For Service Agencies'}
                        </Button>
                    </Nav>}

                    {currentUser && <UserDropdown uid={currentUser.uid} />}
                </NavB.Collapse>


            </NavB>
        </div>
    );
}

export default Navbar;
