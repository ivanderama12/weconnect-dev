import React, { useState, useEffect } from 'react'
import { Navbar as NavB, Container, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../../images/WeConnect-Logo.svg'

import { useAuth } from '../../AuthContext'

const Navbar = () => {

    const history = useHistory()
    const { currentUser, logout, setisagency, isAgency } = useAuth()
    const [isServiceAgency, setIsServiceAgency] = useState(false)

    function handleLogout() {
        logout()
    }

    useEffect(() => {
        setIsServiceAgency(isAgency)
    }, [isAgency]);

    function handleButtonClick() {
        if (!isServiceAgency) {
            setisagency(true)
            history.push('/serviceagency')
        } else {
            setisagency(false)
            history.push('/')
        }
    }

    return (
        <div>
            <NavB className="px-3" bg="light" expand="md">
                <NavB.Brand as={Link} to={isAgency ? "/serviceagency" : "/"}>
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

                        <Nav.Link
                            as={Link}
                            to={isAgency ? '/serviceagency/login' : '/login'}
                        >
                            Login
                        </Nav.Link>
                        <Button
                            variant='outline-danger'
                            onClick={handleButtonClick}
                            style={{ width: '180px' }}>
                            {isAgency ? 'For Establishments' : 'For Service Agencies'}
                        </Button>
                    </Nav>}
                    
                    {currentUser && <Nav className="justify-content-end">
                        <Button onClick={handleLogout}>Logout</Button>
                    </Nav>}
                </NavB.Collapse>


            </NavB>
        </div>
    );
}

export default Navbar;
