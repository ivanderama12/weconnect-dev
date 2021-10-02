import React from 'react'
import { Navbar as NavB, Container, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../images/WeConnect-Logo.svg'
import notificon from '../images/icons/NotificationIcon.svg'
import usericon from '../images/icons/UserIcon.svg'
import msgicon from '../images/icons/MessageIcon.svg'
import agreeicon from '../images/icons/AgreementIcon.svg'
import logouticon from '../images/icons/LogoutIcon.svg'

import { useAuth } from '../AuthContext'

const Navbar = () => {
    return (
        <div>
            <NavB bg="light" expand="md">
                <Container>
                    <NavB.Brand as={Link} to='/admin'>
                        <img src={logo} alt='weconnect-logo' />
                    </NavB.Brand>
                    <NavB id="basic-navbar-nav" style={{ gap: '10px' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant='light '>
                                Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to='/admin/users' > <img className='menu-icon' src={usericon} alt='users' /> Manage Users</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/admin/messages' > <img className='menu-icon' src={msgicon} alt='msgs' /> Messages</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/admin/agreements' > <img className='menu-icon' src={agreeicon} alt='agreements' /> View Agreements</Dropdown.Item>
                                {/* <Dropdown.Item as={Link} to='/admin/' >Change Password</Dropdown.Item> */}
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to='/'> <img className='menu-icon' src={logouticon} alt='logout' /> Logout</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle variant='light '>
                                <img src={notificon} alt='notif' />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#action/3.1">Action</Dropdown.Item>
                                <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to='/'>Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </NavB>
                </Container>
            </NavB>
        </div>
    );
}

export default Navbar;
